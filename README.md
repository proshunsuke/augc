# augc [![Build Status](https://travis-ci.com/proshunsuke/augc.svg?branch=master)](https://travis-ci.com/proshunsuke/augc)

Auto Updating Google Calendar using google apps script

![スケジュールを追加した時の画面](https://user-images.githubusercontent.com/3148511/70384167-eafa3180-19bd-11ea-87e3-4bca2a078021.png)

## 概要

公式サイトのカレンダー情報を元に自動的にGoogleカレンダーの予定を更新します  
更新頻度は1日に1回午前3時〜4時の間に1年分です  
現在対応している公式サイトは以下の通りです
* [スケジュール | 欅坂46公式サイト](https://www.keyakizaka46.com/s/k46o/media/list)

### 目的

イベント情報やテレビ出演情報など新しく発表される情報を忘れないように逐一自分のGoogleカレンダーに登録していたけどそれがすごく面倒くさい。。正しい情報は公式サイトに載っているけどいちいち見に行くのは面倒くさい  
それであれば公式サイトの情報をそのままGoogleカレンダーに登録していけば完璧なのでは？というのがモチベーションです

## 自分のGoogleアカウントでカレンダーを見る方法

自動更新されたGoogleカレンダーを自分のGoogleアカウントのカレンダーに追加することが出来ます

1. URLを追加する  
追加したい予定のURLを[GoogleカレンダーのURL](#GoogleカレンダーのURL)からコピーしてください
2. Googleアカウントでログインをする  
スマホ、もしくはPCで追加したいGoogleのアカウントでログインしてください
3. Googleカレンダーを開く  
現在アプリから追加する方法がありません。スマホを利用している方もPC版のGoogleカレンダーを開いてください
  * [PC版Googleカレンダー](https://calendar.google.com/calendar/r?hl=ja)
4. カレンダーを追加する  
 [他のカレンダー] → [+] → [URLで追加] と進んでください  
 先程コピーしたURLを貼り付けてください  
 [カレンダーを追加]を押してください

![操作例](https://user-images.githubusercontent.com/3148511/70384124-192b4180-19bd-11ea-9ad5-f63d23c74bc0.gif)

## GoogleカレンダーのURL

欅坂46のカレンダー

種類|URL
---|---
握手会|https://calendar.google.com/calendar/ical/jdnc8uf21242be7qjm5nmj7uok%40group.calendar.google.com/public/basic.ics
イベント情報|https://calendar.google.com/calendar/ical/eh0boh68ai7r2v15m38k2ms1lg%40group.calendar.google.com/public/basic.ics
グッズ|https://calendar.google.com/calendar/ical/8l4srrnd9c6vge51k6cclsdsmc%40group.calendar.google.com/public/basic.ics
リリース|https://calendar.google.com/calendar/ical/8tc88j0j9gmr95qa81r8t2210c%40group.calendar.google.com/public/basic.ics
チケット|https://calendar.google.com/calendar/ical/f4bcp8sqv66sugk9m06gb1ioeg%40group.calendar.google.com/public/basic.ics
メディア|https://calendar.google.com/calendar/ical/9beck0tqd2096b3b5utkh0jg8g%40group.calendar.google.com/public/basic.ics
誕生日|https://calendar.google.com/calendar/ical/lihum5fsldhsspa3r8altr01ns%40group.calendar.google.com/public/basic.ics
その他|https://calendar.google.com/calendar/ical/efhfvac7iii073suf8v16tlmic%40group.calendar.google.com/public/basic.ics

## 開発

### 必要なもの

* yarn

### setup

```shell script
make setup
```

### テスト実行

```shell script
make test
```

### リリース

```shell script
make clasp/run
```

## 連絡先

[@pro_shunsuke](https://twitter.com/pro_shunsuke)
