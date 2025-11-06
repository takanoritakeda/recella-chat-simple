# Recella Chat Simple

Dify iframe埋め込み + Basic認証付きチャットアプリケーション（Cloudflare Pages対応）

## 🌟 特徴

- ✅ **超シンプル実装**（HTML 1ファイル + Basic認証）
- ✅ **Dify会話履歴表示**（`/chat/` URL使用で左サイドバー表示）
- ✅ **Basic認証標準装備**（Cloudflare Workers）
- ✅ **完全無料**（Cloudflare Pages無料プラン）
- ✅ **GitHub連携自動デプロイ**
- ✅ **メンテナンスほぼ不要**

## 📋 プロジェクト構成

```
recella-chat-simple/
├── index.html              # メインHTMLファイル（Dify iframe埋め込み）
├── functions/
│   └── _middleware.ts      # Cloudflare Workers Basic認証
└── README.md               # このファイル
```

## 🚀 デプロイ手順

### 1. DifyアプリのURL設定

`index.html` の以下の部分を実際のDify設定に置き換えます：

```html
<!-- 変更前 -->
<iframe src="https://YOUR_DIFY_DOMAIN/chat/YOUR_APP_ID" ...>

<!-- 変更後の例 -->
<iframe src="https://udify.app/chat/abc123xyz" ...>
```

**重要：** `/chat/` URLを使用することで、会話履歴サイドバーが表示されます。
（`/chatbot/` URLはチャット画面のみ）

### 2. Cloudflare Pagesプロジェクト作成

1. https://pages.cloudflare.com にアクセス
2. **「Create a project」** → **「Connect to Git」**
3. GitHubリポジトリ `recella-chat-simple` を選択
4. ビルド設定：
   ```
   Framework preset: None
   Build command: (空欄)
   Build output directory: /
   Root directory: (空欄)
   ```

### 3. 環境変数設定（重要）

Cloudflareダッシュボード → **Settings** → **Environment variables** で以下を追加：

```
Variable name: BASIC_AUTH_USER
Value: admin (お好みのユーザー名)

Variable name: BASIC_AUTH_PASSWORD
Value: your-strong-password-here (強力なパスワードに変更)
```

**適用環境：** Production / Preview / Development すべてにチェック

### 4. デプロイ実行

```bash
git push origin main
```

Cloudflareが自動的にビルド・デプロイを実行します（通常1-2分）。

## 🔐 Basic認証の動作

デプロイ完了後、以下のURLにアクセス：

```
https://your-project.pages.dev
```

**期待される動作：**
1. ブラウザにBasic認証ダイアログが表示
2. 設定したユーザー名・パスワードを入力
3. 認証成功 → Difyチャット画面（会話履歴付き）が表示

### テスト用便利URL（開発時のみ）

```
https://admin:your-password@your-project.pages.dev
```

認証ダイアログをスキップして直接アクセス可能
**注意：** パスワードがURLに含まれるため、本番利用は非推奨

## 🛠️ ローカル開発

### 方法1：ローカルサーバー起動

```bash
# Python 3の場合
python3 -m http.server 8000

# Node.jsの場合（http-serverパッケージ）
npx http-server
```

ブラウザで `http://localhost:8000` にアクセス

### 方法2：Cloudflare Wrangler（Basic認証テスト含む）

```bash
# Wranglerインストール
npm install -g wrangler

# ローカル開発サーバー起動（Basic認証も動作）
npx wrangler pages dev .
```

## 📊 コスト比較

| プラットフォーム | 月額 | Basic認証 | 帯域幅 | 備考 |
|-----------------|------|-----------|--------|------|
| **Cloudflare Pages** | **$0** | ✅ 無料 | 無制限 | **推奨** |
| Vercel (Pro) | $20 | ✅ 標準 | 1TB | - |
| Vercel (Hobby) | $0 | ❌ 非対応 | 100GB | - |
| Netlify | $0 | ❌ $19/月 | 100GB | - |

**年間コスト削減：** Vercel Pro $240 → Cloudflare Pages $0

## 🔧 カスタマイズ

### UIスタイル変更

`index.html` の `<style>` セクションでCSSをカスタマイズ可能：

```css
/* 例：ローディング表示の色変更 */
.loading {
  color: #0066cc;
  font-weight: bold;
}
```

### iframe許可設定変更

```html
<!-- マイク・カメラを無効化したい場合 -->
<iframe src="..." allow=""></iframe>

<!-- 画面共有も許可したい場合 -->
<iframe src="..." allow="microphone; camera; display-capture"></iframe>
```

## 📖 Dify URL形式の違い

| URL形式 | UI表示 |
|---------|--------|
| `/chatbot/xxxxx` | チャット画面のみ |
| `/chat/xxxxx` | **チャット画面 + 左サイドバー会話履歴** ← 推奨 |

参考：[Dify Issue #14148](https://github.com/langgenius/dify/issues/14148)

## 🐛 トラブルシューティング

### iframe が表示されない

1. Dify URLが正しいか確認（`/chat/` URL形式）
2. ブラウザのコンソールでエラー確認
3. Dify側のCORS設定確認

### Basic認証が動作しない

1. 環境変数が正しく設定されているか確認
2. Cloudflare Pages → Settings → Environment variables
3. デプロイ後、環境変数変更時は再デプロイが必要

### 会話履歴が表示されない

- `/chatbot/` URLではなく `/chat/` URLを使用していますか？
- Difyアプリ側で会話履歴機能が有効になっていますか？

## 📄 ライセンス

MIT License

## 🙏 謝辞

- [Dify](https://dify.ai/) - オープンソースLLMアプリ開発プラットフォーム
- [Cloudflare Pages](https://pages.cloudflare.com/) - 無料ホスティングサービス

---

**質問・問題報告：** GitHubのIssuesをご利用ください
