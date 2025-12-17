# 📱 打包APK安装程序 - 完整指南

## ✅ 项目已配置完成

项目已经配置为使用WebView加载本地Web文件，可以直接打包成APK。

### 📁 项目结构

```
apk/
├── app/
│   ├── src/main/
│   │   ├── assets/          ← Web文件已复制到这里
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   └── app.js
│   │   ├── java/.../MainActivity.kt  ← 已修改为WebView版本
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
├── settings.gradle
└── gradlew.bat              ← Windows构建脚本
```

---

## 🚀 方法一：使用Android Studio构建（最简单）

### 步骤：

1. **下载安装Android Studio**
   - 访问：https://developer.android.com/studio
   - 下载并安装（约1GB，需要一些时间）

2. **打开项目**
   - 启动Android Studio
   - 选择 "Open an Existing Project"
   - 选择本项目文件夹（`apk`文件夹）

3. **等待同步**
   - Android Studio会自动下载Gradle和依赖
   - 首次可能需要10-30分钟（取决于网速）
   - 等待底部状态栏显示 "Gradle sync completed"

4. **构建APK**
   - 菜单：`Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - 等待构建完成（通常2-5分钟）

5. **找到APK文件**
   - 构建完成后，会弹出通知
   - 点击 "locate" 打开文件夹
   - 或者手动打开：`app/build/outputs/apk/debug/app-debug.apk`

6. **安装到手机**
   - 将APK文件传输到手机
   - 在手机上允许"安装未知来源应用"
   - 点击APK文件安装

---

## 🌐 方法二：使用GitHub Actions在线构建（无需安装Android Studio）

### 优点：
- ✅ 无需安装Android Studio
- ✅ 无需配置Android SDK
- ✅ 完全免费
- ✅ 可以在任何电脑上操作

### 步骤：

1. **注册GitHub账号**（如果还没有）
   - 访问：https://github.com
   - 注册账号（免费）

2. **创建新仓库**
   - 登录GitHub
   - 点击右上角 "+" → "New repository"
   - 仓库名：`number-search-app`
   - 选择 "Public"
   - 点击 "Create repository"

3. **上传项目文件**
   - 下载Git客户端（Git for Windows）或使用GitHub Desktop
   - 或者直接在GitHub网页上传文件：
     - 点击 "uploading an existing file"
     - 将整个项目文件夹拖拽上传
     - 点击 "Commit changes"

4. **创建GitHub Actions工作流**
   - 在仓库中点击 "Actions" 标签
   - 点击 "set up a workflow yourself"
   - 将下面的内容复制进去：

```yaml
name: Build APK

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
          
      - name: Setup Android SDK
        uses: android-actions/setup-android@v2
        
      - name: Grant execute permission for gradlew
        run: chmod +x gradlew
        working-directory: .
        
      - name: Build APK
        run: ./gradlew assembleDebug
        working-directory: .
        
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug-apk
          path: app/build/outputs/apk/debug/app-debug.apk
```

   - 点击 "Start commit" → "Commit new file"

5. **运行构建**
   - 在仓库页面，点击 "Actions" 标签
   - 选择 "Build APK" workflow
   - 点击右侧 "Run workflow" 按钮
   - 点击绿色的 "Run workflow" 按钮
   - 等待构建完成（通常5-10分钟）

6. **下载APK**
   - 构建完成后，点击运行记录
   - 在页面底部找到 "Artifacts" 部分
   - 点击 "app-debug-apk" 下载
   - 解压zip文件，里面就是APK文件

---

## 💻 方法三：使用命令行（需要Android SDK）

如果你已经安装了Android SDK命令行工具：

```bash
# Windows
gradlew.bat assembleDebug

# Linux/Mac
./gradlew assembleDebug
```

APK文件位置：`app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 安装APK到手机

### 步骤：

1. **传输APK到手机**
   - 方法A：USB数据线连接，复制APK文件
   - 方法B：通过微信/QQ发送给自己
   - 方法C：上传到云盘，在手机上下载

2. **允许安装未知来源**
   - 打开手机"设置"
   - 找到"安全"或"隐私"设置
   - 启用"允许安装未知来源应用"
   - 选择你使用的文件管理器（如"文件管理"）

3. **安装APK**
   - 使用文件管理器找到APK文件
   - 点击APK文件
   - 点击"安装"
   - 等待安装完成

4. **运行应用**
   - 在应用列表中找到"数字搜索工具"
   - 点击打开即可使用

---

## ✅ 验证安装

安装成功后，应用应该：
- ✅ 显示漂亮的Web界面
- ✅ 可以输入起始数字、结束数字、间隔时间
- ✅ 点击"开始搜索"可以打开浏览器搜索
- ✅ 功能与Web版本完全一致

---

## ❓ 常见问题

### Q1: Android Studio同步失败？
**A**: 
- 检查网络连接
- 尝试使用VPN或代理
- 检查防火墙设置

### Q2: 构建APK失败？
**A**: 
- 确保所有文件都在正确位置
- 检查 `app/src/main/assets/` 目录中是否有三个文件
- 查看错误信息，根据提示修复

### Q3: APK安装失败？
**A**: 
- 确保手机Android版本 >= 7.0
- 检查是否允许了"安装未知来源应用"
- 尝试重新下载APK文件

### Q4: 应用打开后是空白？
**A**: 
- 检查assets目录中的文件是否完整
- 确保文件名正确（index.html, style.css, app.js）
- 查看Android Studio的Logcat日志

---

## 📝 推荐方案

**如果你无法安装Android Studio**：
👉 **强烈推荐使用方法二（GitHub Actions）**，完全免费，无需安装任何软件！

**如果你有Android Studio**：
👉 使用方法一最简单直接

---

## 🎉 完成！

构建完成后，你就有了一个可以在手机上安装的APK文件了！

APK文件可以：
- ✅ 分享给朋友使用
- ✅ 安装到多台手机
- ✅ 像普通应用一样使用

如有问题，请查看 `构建APK说明.md` 获取更多帮助。

