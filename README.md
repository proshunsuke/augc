# augc [![Build Status](https://travis-ci.com/proshunsuke/augc.svg?branch=master)](https://travis-ci.com/proshunsuke/augc) [![Coverage Status](https://coveralls.io/repos/github/proshunsuke/augc/badge.svg?branch=master)](https://coveralls.io/github/proshunsuke/augc?branch=master)

Auto Updating Google Calendar using google apps script

![スケジュールを追加した時の画面](https://user-images.githubusercontent.com/3148511/70384167-eafa3180-19bd-11ea-87e3-4bca2a078021.png)

## 概要

公式サイトのカレンダー情報を元に自動的にGoogleカレンダーの予定を更新します  
更新頻度は1日に1回午前3時〜4時の間に1年分です  
現在対応している公式サイトは以下の通りです
* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sakurazaka46_logo.svg/1920px-Sakurazaka46_logo.svg.png" width="12px" alt="櫻坂46のロゴ"> [スケジュール | 櫻坂46公式サイト ](https://sakurazaka46.com/s/s46/media/list)
* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Keyakizaka46_logo.svg/800px-Keyakizaka46_logo.svg.png" width="12px" alt="欅坂46のロゴ"> [スケジュール | 欅坂46公式サイト](https://www.keyakizaka46.com/s/k46o/media/list)

### 目的

イベント情報やテレビ出演情報など新しく発表される情報を忘れないように逐一自分のGoogleカレンダーに登録していたけどそれがすごく面倒くさい。。正しい情報は公式サイトに載っているけどいちいち見に行くのは面倒くさい  
それであれば公式サイトの情報をそのままGoogleカレンダーに登録していけば完璧なのでは？というのがモチベーションです

## 自分のGoogleアカウントでカレンダーを見る方法

自動更新されたGoogleカレンダーを自分のGoogleアカウントのカレンダーに追加することが出来ます

1. 共有用のURLをコピーする  
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

### 櫻坂46のカレンダー

種類|URL
---|---
アルバム|https://calendar.google.com/calendar/ical/0ivcdulcqpm0majeaqo0f1bml8@group.calendar.google.com/public/basic.ics
イベント|https://calendar.google.com/calendar/ical/ulksj6q2hr6hvvre7jqk2rghe4@group.calendar.google.com/public/basic.ics
シングル|https://calendar.google.com/calendar/ical/rf2qon3acq2g8fj1iuvngmp7tg@group.calendar.google.com/public/basic.ics
その他|https://calendar.google.com/calendar/ical/06ol8jcjk0r5bviarevjicta70@group.calendar.google.com/public/basic.ics
テレビ|https://calendar.google.com/calendar/ical/14elrf80nstbrahsfe2iuem8fg@group.calendar.google.com/public/basic.ics
メディア|https://calendar.google.com/calendar/ical/ivej29993ugnjb20l077n233i4@group.calendar.google.com/public/basic.ics
ライブ|https://calendar.google.com/calendar/ical/dbot8s6eu5o91u6evdi4hucdr0%40group.calendar.google.com/public/basic.ics
ラジオ|https://calendar.google.com/calendar/ical/f01lrnkgl42eqfbs1k97u7mrdc@group.calendar.google.com/public/basic.ics
リリース|https://calendar.google.com/calendar/ical/oo8hkuk4udrflu06337hq42jqo@group.calendar.google.com/public/basic.ics
握手会|https://calendar.google.com/calendar/ical/d7q626djcs2ooq8rkpoc045d5c%40group.calendar.google.com/public/basic.ics
映画|https://calendar.google.com/calendar/ical/hbflgqvcrjvd9c1a07q5t93ork@group.calendar.google.com/public/basic.ics
雑誌|https://calendar.google.com/calendar/ical/2veim8rg9o7k2js0jtng8i2dug@group.calendar.google.com/public/basic.ics
新聞|https://calendar.google.com/calendar/ical/g3puqreu4a67quqqu7ueo58l5k@group.calendar.google.com/public/basic.ics
誕生日|https://calendar.google.com/calendar/ical/02mgt618voeueel3gonuc62nrs@group.calendar.google.com/public/basic.ics
配信|https://calendar.google.com/calendar/ical/20vk7nohgs6r8up3d0im1olhpg%40group.calendar.google.com/public/basic.ics
WEB|https://calendar.google.com/calendar/ical/3vou5o22r7tdvks9ibqcfc94hg%40group.calendar.google.com/public/basic.ics
写真集|https://calendar.google.com/calendar/ical/t3a2ndlevb6d0ufcg8himsg0ng%40group.calendar.google.com/public/basic.ics

### 欅坂46のカレンダー

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
make push
```

## 連絡先

[@pro_shunsuke](https://twitter.com/pro_shunsuke)
