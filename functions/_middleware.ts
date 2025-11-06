/**
 * Cloudflare Pages Functions Middleware
 * Basic認証を実装
 *
 * 環境変数（Cloudflareダッシュボードで設定）:
 * - BASIC_AUTH_USER: 認証ユーザー名
 * - BASIC_AUTH_PASSWORD: 認証パスワード
 */

interface Env {
  BASIC_AUTH_USER: string
  BASIC_AUTH_PASSWORD: string
}

export async function onRequest(context: {
  request: Request
  env: Env
  next: () => Promise<Response>
}): Promise<Response> {
  const { request, env, next } = context

  // 環境変数から認証情報取得
  const BASIC_AUTH_USER = env.BASIC_AUTH_USER
  const BASIC_AUTH_PASSWORD = env.BASIC_AUTH_PASSWORD

  // 環境変数が設定されていない場合は認証をスキップ（開発時用）
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASSWORD) {
    console.warn('⚠️ Basic認証の環境変数が設定されていません。認証をスキップします。')
    return next()
  }

  // 認証ヘッダーを確認
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Basic認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }

  // Base64デコード
  try {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = atob(base64Credentials)
    const [username, password] = credentials.split(':')

    // 認証検証
    if (username === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
      // 認証成功 - 次のミドルウェア/ページへ
      return next()
    }
  } catch (error) {
    console.error('Basic認証エラー:', error)
  }

  // 認証失敗
  return new Response('認証に失敗しました', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
