# scratchX_mabeee
ScratchX上でMaBeeeを動かすための拡張機能です。現在はmacOSのみに対応しています。別途でMaBeeeのmacOS用アプリが必要なので、[こちらのページ](https://github.com/novars-jp/MaBeeeMacApp)からダウンロードしておいてください。

## 拡張機能のインポート方法
1. [ScratchX](http://scratchx.org/)のページを開いてください。
![2017-04-12 22 48 11](https://cloud.githubusercontent.com/assets/24409457/25064940/9d83422e-2240-11e7-8a66-aa7e84ee9343.png)

2. トップページの Open Extension URL をクリックして、https://novars-jp.github.io/scratchX_mabeee/mabeee.js を入力して進んでください。 

3. 下の画像のようなアラートが出ますが、ここでは無視して構いません。
![2017-04-13 2 19 41](https://cloud.githubusercontent.com/assets/24409457/25064958/cb892030-2240-11e7-894e-0a8dca7790dd.png)

4. More Blocks の中に MaBeee Extension が現れれば準備完了です。
![2017-04-12 23 36 29](https://cloud.githubusercontent.com/assets/24409457/25064961/eb364e26-2240-11e7-8e14-2391b0f1eb7f.png)

## 各ブロックの使い方
ここからは、拡張機能がインポートできたものとして、各ブロックの使い方を順に説明していきます。
なお、拡張機能を使用するためにはmacOS用のMaBeeeアプリが起動されている必要があります。
先にダウンロードしておいたMaBeeeアプリを起動しておいてください。(上部のステータスバーに電池のアイコンが現れればスタンバイ完了です。)

### 「MaBeeeとせつぞくする」ブロック
![2017-04-13 0 00 01](https://cloud.githubusercontent.com/assets/24409457/25064963/04cbcf14-2241-11e7-8f6c-20c9db15b236.png)

近くにあるMaBeeeの中から特定のMaBeeeと接続します。接続のためにしばらく時間がかかるので、完了のアラートが出るまでは待機してください。
現在同時接続できるMaBeeeは１台のみとなっています。
スキャンと接続が完了すると、接続したMaBeeeのデバイス名をポップアップで表示します。

### 「MaBeeeをオンにする」「MaBeeeをオフにする」ブロック
![2017-04-12 23 59 12](https://cloud.githubusercontent.com/assets/24409457/25064967/218eb4d6-2241-11e7-9101-8138e83a5e3e.png)
![2017-04-13 0 17 21](https://cloud.githubusercontent.com/assets/24409457/25064969/25e75d1c-2241-11e7-9411-07d98e43dcf0.png)

MaBeeeの出力をそれぞれ、100 / 0 にするブロックです。MaBeeeに出力変更のリクエストを間髪無く送っているとエラーが発生するため、実行後に0.1秒の待ち時間を作っています。
そのため、forブロックなどの中に置いても自分でwaitブロックを使って実行を遅らせる必要はありません。これは、MaBeee拡張のすべてのブロックに共通しています。

### 「MaBeeeの出力を〇〇にする」ブロック
![2017-04-13 0 28 28](https://cloud.githubusercontent.com/assets/24409457/25064974/3af804d6-2241-11e7-8586-b3fd8fec2031.png)

MaBeeeの出力を0~100の間でしていすることができます。このブロックでは〇〇の部分に直接数字を入力することも、後述する「でんぱのつよさ」ブロックなどのレポーターブロックを入れることもできます。
出力は、0以下の数値が入力された場合は0に、100以上の数値が入力された場合は100になります。

### 「〇〇秒後にMaBeeeをオンにする」「〇〇秒後にmabeeeをオフにする」ブロック
![2017-04-13 0 35 57](https://cloud.githubusercontent.com/assets/24409457/25064976/48df2aa2-2241-11e7-8d3e-283b04d77317.png)
![2017-04-13 0 36 17](https://cloud.githubusercontent.com/assets/24409457/25064977/4a9db05c-2241-11e7-8402-822db6bd3e7a.png)

オンタイマー、オフタイマーのような使い方ができるブロックです。〇〇部分には「MaBeeeの出力を〇〇にする」ブロックと同様に数値やレポーターブロックを入れることができます。

### 「でんぱのつよさ」ブロック
![2017-04-13 0 42 35](https://cloud.githubusercontent.com/assets/24409457/25064986/573b650c-2241-11e7-9efa-25439ac80d6d.png)

電波の強度を計測するレポーターブロックです。レポーターブロックとは指定された値を返すブロックのことで、他のブロックの空白部分に入れて使うことができます。
電波強度は0~100の整数で返されるので、「MaBeeeの出力を〇〇にする」ブロックに入れて使えば、電波強度に合わせてMaBeeeの出力をコントロールできるようになります。

### 「MaBeeeとのせつぞくをやめる」ブロック
![2017-04-13 0 47 51](https://cloud.githubusercontent.com/assets/24409457/25064988/613127e0-2241-11e7-930c-ce913b16ce22.png)

MaBeeeとの接続を切断します。ScratchXを離れた時に自動的にMaBeeeとの接続が切れるようになっているので通常はわざわざ使う必要がありませんが、別のMaBeeeに接続しなおしたい時などに使えるかと思います。

## MaBeeeブロックを使った応用例

### MaBeeeをオンにするだけ
![2017-04-13 1 03 15](https://cloud.githubusercontent.com/assets/24409457/25065029/d8f9393e-2241-11e7-8dcc-1b55c8c0c3fb.png)

### MaBeeeを10秒だけオンにする
![2017-04-13 1 02 07](https://cloud.githubusercontent.com/assets/24409457/25065013/c1a86f8e-2241-11e7-98e0-cf770cab0081.png)

### MaBeeeのオン・オフを3秒ごとに切り替える
![2017-04-13 1 05 03](https://cloud.githubusercontent.com/assets/24409457/25065033/f2d760f6-2241-11e7-92b3-948e062742f6.png)

### MaBeeeの出力を１秒間に10ずつ上げる
![2017-04-13 1 11 54](https://cloud.githubusercontent.com/assets/24409457/25065078/13b72166-2243-11e7-8dde-5167352eea1f.png)

この画像では、powerブロックを変数ブロックとして使っています。変数ブロックとは特定の値を持っているブロックで、持っている値を他のブロックで使ったり、値に他の値を代入したりできます。
変数ブロックの作り方はは、Scripts→Dataの中の Make a Variable をクリックして、ほしい変数名を入力するだけです。

### 周囲の音量に合わせてMaBeeeの出力をコントロールする
![2017-04-13 1 35 09](https://cloud.githubusercontent.com/assets/24409457/25065042/2d1bc7e8-2242-11e7-86b4-ea41f3ef015a.png)

### 電波強度に合わせてMaBeeeの出力をコントロール
![2017-04-13 1 34 44](https://cloud.githubusercontent.com/assets/24409457/25065044/30fd5b4c-2242-11e7-8030-54c770142ebf.png)

### 電波強度が一定以上の時だけMaBeeeをオン
![2017-04-13 1 39 20](https://cloud.githubusercontent.com/assets/24409457/25065047/50148b54-2242-11e7-8115-6abaf6d6f04a.png)

### マウスカーソルの場所によってMaBeeeのオン・オフを切り替える
![2017-04-13 1 46 12](https://cloud.githubusercontent.com/assets/24409457/25065051/6477b562-2242-11e7-9d63-c85ee64b1a7d.png)

### 体内時計ゲーム
![2017-04-13 2 14 48](https://cloud.githubusercontent.com/assets/24409457/25065060/7fd1c62c-2242-11e7-843f-17c41d06041e.png)

スタートボタン(ここではsキー)を押すとタイマーがスタートし、ストップボタン(ここではスペースキー)を押すまでの時間が一定の範囲内であればMaBeeeがオンになる体内時計ゲームです。


## 参考にさせていただいたサイト

- [ScratchX の Extension をローカルで開発する環境を整える](http://qiita.com/mironal/items/99779c4d307fb004bee7)
- [ScratchX で非同期のコマンドブロック(Asynchronous command)を作る](http://qiita.com/mironal/items/180c3af71942ad42fa3e#_reference-0a9df38a2bd6d5e687c2)
- [ScratchXの公式ドキュメント](https://github.com/LLK/scratchx/wiki)
