# Kids Corde (キッズコーデ提案アプリ）

その日に天気と気温に合わせた子供服

## アプリ画面のスクリーンショット

###　トップ画面
<img width="1909" height="1004" alt="top" src="https://github.com/user-attachments/assets/5812c810-2270-48b5-b6a3-6591eb275cf4" />

###　コーデ検索結果画面
<img width="1884" height="1011" alt="rain10" src="https://github.com/user-attachments/assets/e3c7efea-108e-4d72-a0b0-6c54c613cb4e" />

###　コーデ新規登録画面
<img width="1903" height="1004" alt="new_wear" src="https://github.com/user-attachments/assets/b7d15353-f264-48de-aef7-400847a238fc" />
---
##機能
**天気、気温によるコーデ検索機能**:天気(晴れ、曇り、雨)と気温入力で服装表示
**コーデ新規登録機能
**コーデ削除機能

---

##　使用技術
###　フロントエンド
- React / vite
- JavaScript (ES56+)
- HTMLS / CSS3

 ## バックエンド
 -Java 17 /Spring Boot
 -Spring Data JPA

 ###　データベース
 - My SQL

---

##　データベース設計 (ER図)

-テーブル名：`outfits` (id, name, weather, min_temperture, max_temperture, image_url, memo)

## ローカル環境での起動方法
1 MySQLを起動
2 バックエンド(Spring Boot)の　実行(ポート 8080)
3 フロントエンド　(React)のフォルダ　`npm run dev`　実行、`http:localhost:5173`にアクセス




















