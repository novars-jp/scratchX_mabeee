var MaBeee = function(id, name, isConnected) {
    this.id = id;
    this.name = name;
    this.isConnected = isConnected;
};
MaBeee.prototype = {
    setId: function(id) {
        this.id = id;
    },
    setName: function(name) {
        this.name = name;
    },
    setIsConnected: function(isConnected) {
        this.isConnected = isConnected;
    },
    getId: function() {
        return this.id;
    },
    getName: function() {
        return this.name;
    },
    getIsConnected: function() {
        return this.isConnected;
    }
};


(function(ext) {

    var mabeees = [];

    ext._shutdown = function() {
        for (var i = 0; i < mabeees.length; i++) {
            requestMaBeeeAction('devices/' + mabeees[i].getId() + '/disconnect');
        }
        requestMaBeeeAction('scan/stop');
    };

    ext._getStatus = function() {
        var isMaBeeeConnected = false;
        var mabeee_names = "";

        for (var i = 0; i < mabeees.length; i++) {
            if (mabeees[i].getIsConnected() == true) {
                mabeee_names += mabeees[i].getName() + " ";
                isMaBeeeConnected = true;
            };
        }

        if (mabeees.length == 0) {
            return {
                status: 0,
                msg: '周囲のMaBeeeをスキャンしてください。'
            };
        } else if (!isMaBeeeConnected) {
            return {
                status: 1,
                msg: '接続待機中のMaBeeeがあります。'
            };
        } else {
            return {
                status: 2,
                msg: mabeee_names + 'に接続しました。'
            };
        }
    };

    ext.setMaBeeeOn = function() {
        for (var i = 0; i < mabeees.length; i++) {
            requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=100');
        }
    };

    ext.setMaBeeeOff = function() {
        for (var i = 0; i < mabeees.length; i++) {
            requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=0');
        }
    };

    ext.setMaBeeePower = function(power) {
        if (power > 100) {
            power = 100;
        } else if (power < 0) {
            power = 0;
        }
        for (var i = 0; i < mabeees.length; i++) {
            requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=' + power);
        }
    };

    ext.setMaBeeeOnAfterWaiting = function(wait, callback) {
        setTimeout(function() {
            for (var i = 0; i < mabeees.length; i++) {
                requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=100');
            }
            callback();
        }, wait * 1000);
    };

    ext.setMaBeeeOffAfterWaiting = function(wait, callback) {
        setTimeout(function() {
            for (var i = 0; i < mabeees.length; i++) {
                requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=0');
            }
            callback();
        }, wait * 1000);
    };

    ext.setSelectedMaBeeeOn = function(name) {
        for (var i = 0; i < mabeees.length; i++) {
            if (mabeees[i].getName() === name) {
                requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=100');
            }
        }
    };

    ext.setSelectedMaBeeeOff = function(name) {
        for (var i = 0; i < mabeees.length; i++) {
            if (mabeees[i].getName() === name) {
                requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=0');
            }
        }
    };

    ext.setSelectedMaBeeePower = function(name, power) {
        if (power > 100) {
            power = 100;
        } else if (power < 0) {
            power = 0;
        }
        for (var i = 0; i < mabeees.length; i++) {
            if (mabeees[i].getName() === name) {
                requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=' + power);
            }
        }
    };

    ext.getRssi = function(name, callback) {
        for(var i = 0; i < mabeees.length; i++) {
            if (mabeees[i].getName() === name) {
                requestMaBeeeAction('devices/' + mabeees[i].getId() + '/update?p=rssi');
                getRssiById(mabeees[i].getId(), function(rssi) {
                    callback(parseInt(rssi, 10) * (-1));
                });
            }
        }
    };

    ext.setSelectedMaBeeeOnAfterWaiting = function(wait, name, callback) {
        setTimeout(function() {
            for (var i = 0; i < mabeees.length; i++) {
                if (mabeees[i].getName() === name) {
                    requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=100');
                }
            }
            callback();
        }, wait * 1000);
    };

    ext.setSelectedMaBeeeOffAfterWaiting = function(wait, name, callback) {
        setTimeout(function() {
            for (var i = 0; i < mabeees.length; i++) {
                if (mabeees[i].getName() === name) {
                    requestMaBeeeAction('devices/' + mabeees[i].getId() + '/set?pwm_duty=0');
                }
            }
            callback();
        }, wait * 1000);
    };

    ext.scanAllMaBeees = function() {
        requestMaBeeeAction('scan/start');
        setTimeout(function() {
            getAllMaBeees(function(mabeee_list) {
                mabeees = mabeee_list;
                requestMaBeeeAction('scan/stop');

                descriptor.menus.mabeees = [];
                for (var i = 0; i < mabeees.length; i++) {
                    descriptor.menus.mabeees.push(mabeees[i].getName());
                }
                ScratchExtensions.unregister('MaBeee Extension');
                ScratchExtensions.register('MaBeee Extension', descriptor, ext);
            });
        }, 1000);
    };

    ext.connectMaBeee = function(name) {
        requestMaBeeeAction('scan/start');
        setTimeout(function() {
            for (var i = 0; i < mabeees.length; i++) {
                if (mabeees[i].getName() === name) {
                    requestMaBeeeAction('devices/' + mabeees[i].getId() + '/connect');
                    showMaBeeeStateInAlert(mabeees[i].getId());
                    mabeees[i].setIsConnected(true);
                    setTimeout(function() {
                        requestMaBeeeAction('scan/stop');
                    }, 100);
                }
            }
        }, 1000);
    };


    ext.disconnectMaBeee = function() {
        for (var i = 0; i < mabeees.length; i++) {
            requestMaBeeeAction('devices/' + mabeees[i].getId() + '/disconnect');
            mabeees[i].setIsConnected(false);
        }
    };

    var descriptor = {
        blocks: [
            [' ', '周囲のMaBeeeをスキャンする', 'scanAllMaBeees'],
            [' ', '%m.mabeees とせつぞくする', 'connectMaBeee'],
            [' ', 'MaBeeeをオンにする', 'setMaBeeeOn'],
            [' ', 'MaBeeeをオフにする', 'setMaBeeeOff'],
            [' ', 'MaBeeeの出力を %s にする', 'setMaBeeePower', 50],
            ['w', '%s 秒後にMaBeeeをオンにする', 'setMaBeeeOnAfterWaiting', 3],
            ['w', '%s 秒後にMaBeeeをオフにする', 'setMaBeeeOffAfterWaiting', 3],
            [' ', '%m.mabeees をオンにする', 'setSelectedMaBeeeOn'],
            [' ', '%m.mabeees をオフにする', 'setSelectedMaBeeeOff'],
            [' ', '%m.mabeees の出力を %s にする', 'setSelectedMaBeeePower', '', 50],
            ['R', '%m.mabeees のでんぱのつよさ', 'getRssi'],
            ['w', '%s 秒後に %m.mabeees をオンにする', 'setSelectedMaBeeeOnAfterWaiting', 3, ''],
            ['w', '%s 秒後に %m.mabeees をオフにする', 'setSelectedMaBeeeOffAfterWaiting', 3, ''],
            [' ', 'MaBeeeのせつぞくをやめる', 'disconnectMaBeee'],
        ],
        menus: {
            mabeees: []
        }
    };

    ScratchExtensions.register('MaBeee Extension', descriptor, ext);
})({});

function getXHR() {
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
                // alert('通信に失敗しました。MaBeeeアプリやBluetoothがオンになっているか確認してください。');
            }
        }
    };
    request.open('GET', 'http://localhost:11111/' + path, true);
    request.send(null);
}

//pathを渡してMaBeeeにHTTP GETするメソッドです。
function requestMaBeeeAction(path) {
    requestHttpGet(path, function(json) {});
}

//渡したidのMaBeeeの接続状況を返します。
function showMaBeeeStateInAlert(id) {
    requestHttpGet('devices/' + id, function(json) {
        if (json.name == null) {
            alert('接続に失敗しました。');
        } else {
            alert(json.name + 'に接続しました。');
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

        if (device_names === "") {
            alert("MaBeeeが見つかりませんでした。");
        } else {
            callback(device_names);
        }
    });
}

//周囲のMaBeeeをスキャンしてMaBeeeの配列を取得
function getAllMaBeees(callback) {
    var mabeees = [];
    requestHttpGet('devices/', function(json) {
        for (var i = 0; i < json.devices.length; i++) {
            var mabeee = new MaBeee(json.devices[i].id, json.devices[i].name, false);
            mabeees.push(mabeee);
        }
        callback(mabeees);
    });
}
