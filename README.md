# trimochiSortingHat

接頭辞は`?hat`です。

## Getting Started

1. botをサーバーに追加します。
2. サーバーの役職で、「メンバーの移動」が許可された役職を作ります。
3. とりもち組分け帽子の役職をその役職にします。
4. セットしたいボイスチャンネルに参加して、setコマンドで lobby, aChannel, bChannelをセットします。（最初の一回のみでおｋ）
5. lobbyに割り当てたボイスチャンネルに振り分けたいメンバー全員が参加します。
6. runコマンドで組み分けられます。
7. cコマンドでlobbyに全員を回収します。

## コマンド

```
?hat <command>

set <lobby, a, b>: チャンネルをセットします。
// example -> ?hat set lobby

run: 組分けを行います。
// ?hat run

c: Aチャンネル、Bチャンネルのメンバーをロビーに回収します。
// ?hat c
```