
var MaBeee = function(id, name) {
    this.id = id;
    this.name = name;
};
MaBeee.prototype = {
    setId: function(id) {
        this.id = id;
    },
    setName: function(name) {
        this.name = name;
    },
    getId: function() {
        return this.id;
    },
    getName: function() {
        return this.name;
    }
};


(function(ext) {

    var mabeee = new MaBeee(1, "scratch");

    ext._shutdown = function() {
        requestMaBeeeAction('devices/' + mabeee.getId() + '/disconnect');
        requestMaBeeeAction('scan/stop');
    };

    ext._getStatus = function() {
        return {
            status: 2,
            msg: 'Ready'
        };
    };

    ext.setMaBeeeOn = function() {
        requestMaBeeeAction('devices/' + mabeee.getId() + '/set?pwm_duty=100');
    };

    ext.setMaBeeeOff = function() {
        requestMaBeeeAction('devices/' + mabeee.getId() + '/set?pwm_duty=0');
    };

    ext.setMaBeeePower = function(power) {
        if (power > 100) {
            power = 100;
        } else if (power < 0) {
            power = 0;
        }
        requestMaBeeeAction('devices/' + mabeee.getId() + '/set?pwm_duty=' + power);
    };

    ext.setMaBeeeOnAfterWaiting = function(wait, callback) {
        setTimeout(function() {
            requestMaBeeeAction('devices/' + mabeee.getId() + '/set?pwm_duty=100');
            callback();
        }, wait * 1000);
    };

    ext.setMaBeeeOffAfterWaiting = function(wait, callback) {
        setTimeout(function() {
            requestMaBeeeAction('devices/' + mabeee.getId() + '/set?pwm_duty=0');
            callback();
        }, wait * 1000);
    };

    ext.getRssi = function(callback) {
        requestMaBeeeAction('devices/' + mabeee.getId() + '/update?p=rssi');
        getRssiById(mabeee.getId(), function(rssi) {
            callback(parseInt(rssi, 10) * (-1));
        });
    };

    ext.connectMaBeee = function() {
        requestMaBeeeAction('scan/start');
        var name = "";
        setTimeout(function() {
            getDevicesName(function(names) {
                if (names == "") {
                    alert("Device not found");
                } else {
                    name = prompt("Please enter the name of device you want to connect\n" + names);
                    getIdByName(name, function(id) {
                        mabeee.setId(id);
                        requestMaBeeeAction('devices/' + mabeee.getId() + '/connect');
                        setTimeout(function() {
                            requestMaBeeeAction('scan/stop');
                            showMaBeeeStateInAlert(mabeee.getId());
                            mabeee.setState("Connected");
                        }, 100);
                    });
                }
            });
//小山        }, 10000);
        }, 1000);
    };

    ext.disconnectMaBeee = function() {
        requestMaBeeeAction('devices/' + mabeee.getId() + '/disconnect');
        mabeee.setState("Disconnected");
    };

    var descriptor = {
        blocks: [
            [' ', 'Turn on MaBeee', 'setMaBeeeOn'],
            [' ', 'Turn off MaBeee', 'setMaBeeeOff'],
            [' ', 'Set MaBeeee power to %s', 'setMaBeeePower', 50],
            ['w', 'Turn on MaBeee after %s seconds', 'setMaBeeeOnAfterWaiting', 3],
            ['w', 'Turn off MaBeee after %s seconds', 'setMaBeeeOffAfterWaiting', 3],
            ['R', 'Bluetooth intensity', 'getRssi'],
            [' ', 'Connect MaBeeee', 'connectMaBeee'],
            [' ', 'Disconnect MaBeee', 'disconnectMaBeee'],
        ]
    };

    ScratchExtensions.register('MaBeee Extension', descriptor, ext);
})({});

function getXHR() {
    var request;
    try {
        request = new XMLHttpRequest();
    } catch (e) {
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            request = new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    return request;
}

function requestHttpGet(path, callback) {
    var request = getXHR();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var json = eval('(' + request.responseText + ')');
                callback(json);
            } else {
//小山                alert('通信に失敗しました。MaBeeeアプリやBluetoothがオンになっているか確認してください。');
            }
        }
    };
    request.open('GET', 'http://localhost:22222/' + path, true);
    request.send(null);
    setTimeout(function() {}, 100);
}

//pathを渡してMaBeeeにHTTP GETするメソッドです。
function requestMaBeeeAction(path) {
    requestHttpGet(path, function(json) {});
}

//渡したidのMaBeeeの接続状況を返します。
function showMaBeeeStateInAlert(id) {
    requestHttpGet('devices/' + id, function(json) {
        if (json.name == null) {
            alert('Connection failed');
        } else {
            alert('Connected to ' + json.name);
        }
    });
};

//Idから電波強度を取得します。数値はマイナス値で返されます。
function getRssiById(id, callback) {
    requestHttpGet('devices/' + id, function(json) {
        callback(json.rssi);
    });
}

function getIdByName(name, callback) {
    requestHttpGet('devices/', function(json) {
        for (var i = 0; i < json.devices.length; i++) {
            if (json.devices[i].name === name) {
                callback(json.devices[i].id);
            }
        }
    });
}

function getDevicesName(callback) {
    requestHttpGet('devices/', function(json) {
        var device_names = "";
        for (var i = 0; i < json.devices.length; i++) {
            device_names += '- ' + json.devices[i].name + '\n';
        }
        callback(device_names);
    });
}

//周囲のMaBeeeをスキャンしてMaBeeeの配列を取得
function getAllMaBeees(callback) {
    var mabeees = [];
    requestHttpGet('devices/', function(json) {
        for (var i = 0; i < json.devices.length; i++) {
            var mabeee = new MaBeee(json.devices[i].id, json.devices[i].name);
            mabeees.push(mabeee);
            callback(mabeees);
        }
    });
}

function checkIfMaBeeeIsConnected(id, callback) {
    requestHttpGet('devices/', function(json) {
        for (var i = 0; i < json.devices.length; i++) {
            if (json.devices[i].id == id) {
                callback(true);
            }
        }
    });
}
