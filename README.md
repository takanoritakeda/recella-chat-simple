# Recella Chat Simple

Dify iframe埋め込みチャットアプリケーション（Cloudflare Pages対応）

## 🌟 特徴

- ✅ **超シンプル実装**（HTML 1ファイルのみ）
- ✅ **Dify会話履歴表示**（`/chat/` URL使用で左サイドバー表示）
- ✅ **Cloudflare Access対応**（OTP認証など）
- ✅ **完全無料**（Cloudflare Pages無料プラン）
- ✅ **GitHub連携自動デプロイ**
- ✅ **メンテナンスほぼ不要**

## 📋 プロジェクト構成

```
recella-chat-simple/
├── index.html              # メインHTMLファイル（Dify iframe埋め込み）
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
3. GitHubリポジトリを選択
4. ビルド設定：
   ```
   Framework preset: None
   Build command: (空欄)
   Build output directory: /
   Root directory: (空欄)
   ```

### 3. デプロイ実行

```bash
git push origin main
```

Cloudflareが自動的にビルド・デプロイを実行します（通常1-2分）。

## 🔐 アクセス制御（オプション）

### Cloudflare Access で認証を追加

サイトへのアクセスを制限したい場合、Cloudflare Accessを使用できます：

1. Cloudflareダッシュボード → **Zero Trust** → **Access**
2. **Applications** → **Add an application**
3. アプリケーションタイプを選択（例：Self-hosted）
4. 認証方法を選択：
   - One-time PIN（OTP：メール認証）
   - GitHub、Google、Azure ADなどのSSO
   - その他の認証プロバイダー

**Cloudflare Accessの利点：**
- ✅ OTP（ワンタイムパスワード）による認証
- ✅ 複数の認証プロバイダー対応
- ✅ 無料プランで最大50ユーザーまで
- ✅ より高度なアクセス制御

詳細：https://developers.cloudflare.com/cloudflare-one/applications/

## 🛠️ ローカル開発

### 方法1：ローカルサーバー起動

```bash
# Python 3の場合
python3 -m http.server 8000

# Node.jsの場合（http-serverパッケージ）
npx http-server
```

ブラウザで `http://localhost:8000` にアクセス

### 方法2：Cloudflare Wrangler

```bash
# Wranglerインストール
npm install -g wrangler

# ローカル開発サーバー起動
npx wrangler pages dev .
```

## 📊 コスト比較

| プラットフォーム | 月額 | 認証機能 | 帯域幅 | 備考 |
|-----------------|------|----------|--------|------|
| **Cloudflare Pages** | **$0** | ✅ Access無料枠 | 無制限 | **推奨** |
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

### 会話履歴が表示されない

- `/chatbot/` URLではなく `/chat/` URLを使用していますか？
- Difyアプリ側で会話履歴機能が有効になっていますか？

## 📄 ライセンス

MIT License

## 🙏 謝辞

- [Dify](https://dify.ai/) - オープンソースLLMアプリ開発プラットフォーム
- [Cloudflare Pages](https://pages.cloudflare.com/) - 無料ホスティングサービス
- [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/) - ゼロトラストアクセス制御

---

**質問・問題報告：** GitHubのIssuesをご利用ください
