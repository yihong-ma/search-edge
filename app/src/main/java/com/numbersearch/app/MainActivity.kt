package com.numbersearch.app

import android.os.Bundle
import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

/**
 * 主Activity类
 * 功能：使用WebView加载本地Web应用，实现数字搜索功能
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private val TAG = "NumberSearch"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 创建WebView
        webView = WebView(this)
        setContentView(webView)

        // 配置WebView
        setupWebView()

        // 加载本地HTML文件
        loadLocalHtml()
    }

    /**
     * 配置WebView设置
     */
    private fun setupWebView() {
        val webSettings: WebSettings = webView.settings
        
        // 启用JavaScript
        webSettings.javaScriptEnabled = true
        
        // 允许访问文件
        webSettings.allowFileAccess = true
        webSettings.allowContentAccess = true
        
        // 设置缓存模式
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // 启用DOM存储
        webSettings.domStorageEnabled = true
        
        // 启用数据库存储
        webSettings.databaseEnabled = true
        
        // 设置默认编码
        webSettings.defaultTextEncodingName = "UTF-8"
        
        // 支持缩放
        webSettings.setSupportZoom(true)
        webSettings.builtInZoomControls = true
        webSettings.displayZoomControls = false
        
        // 设置视口
        webSettings.useWideViewPort = true
        webSettings.loadWithOverviewMode = true
        
        // 设置WebViewClient，确保链接在WebView中打开
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                // 如果是搜索URL，允许打开外部浏览器
                if (url != null && (url.startsWith("https://www.bing.com/search") || 
                    url.startsWith("http://www.bing.com/search"))) {
                    // 允许在外部浏览器中打开
                    return false
                }
                // 其他链接在WebView中打开
                return false
            }
        }
        
        // 设置WebChromeClient，用于处理JavaScript对话框等
        webView.webChromeClient = WebChromeClient()
        
        Log.d(TAG, "WebView配置完成")
    }

    /**
     * 加载本地HTML文件
     */
    private fun loadLocalHtml() {
        try {
            // 加载assets目录中的index.html文件
            webView.loadUrl("file:///android_asset/index.html")
            Log.d(TAG, "开始加载本地HTML文件")
        } catch (e: Exception) {
            Log.e(TAG, "加载HTML文件失败", e)
        }
    }

    /**
     * 处理返回键，如果WebView可以返回，则返回上一页
     */
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    /**
     * Activity销毁时清理WebView
     */
    override fun onDestroy() {
        super.onDestroy()
        webView.destroy()
    }

    /**
     * Activity暂停时暂停WebView
     */
    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    /**
     * Activity恢复时恢复WebView
     */
    override fun onResume() {
        super.onResume()
        webView.onResume()
    }
}
