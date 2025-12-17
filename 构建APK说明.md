# 📱 如何构建APK安装包

本应用已经配置为使用WebView加载本地Web文件，可以直接打包成APK安装到手机上。

## 🎯 方法一：使用Android Studio（推荐）

### 前提条件
- 已安装Android Studio
- 已配置Android SDK

### 步骤

1. **打开项目**
   - 打开Android Studio
   - 选择 "Open an Existing Project"
   - 选择本项目文件夹

2. **等待同步**
   - Android Studio会自动下载依赖
   - 等待Gradle同步完成（可能需要几分钟）

3. **构建APK**
   - 菜单：`Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - 等待构建完成（可能需要几分钟）

4. **找到APK文件**
   - 构建完成后，点击通知中的 "locate"
   - 或者手动打开：`app/build/outputs/apk/debug/app-debug.apk`

5. **安装到手机**
   - 将APK文件传输到手机（通过USB、微信、QQ等）
   - 在手机上允许"安装未知来源应用"
   - 点击APK文件进行安装

---

## 🌐 方法二：使用在线构建服务（无需安装Android Studio）

如果你无法安装Android Studio，可以使用在线构建服务：

### 选项1：GitHub Actions（免费，需要GitHub账号）

1. **创建GitHub仓库**
   - 注册GitHub账号（如果还没有）
   - 创建新仓库
   - 将项目文件上传到仓库

2. **启用GitHub Actions**
   - 在仓库中创建 `.github/workflows/build.yml` 文件
   - 使用下面的配置：

```yaml
name: Build APK

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK
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
          name: app-debug
          path: app/build/outputs/apk/debug/app-debug.apk
```

3. **运行构建**
   - 在GitHub仓库页面，点击 "Actions" 标签
   - 点击 "Build APK" workflow
   - 点击 "Run workflow" 按钮
   - 等待构建完成

4. **下载APK**
   - 构建完成后，在 "Artifacts" 部分下载APK文件

### 选项2：使用Appetize.io或其他在线构建服务

一些在线服务可以帮你构建APK，但可能需要付费。

---

## 🔧 方法三：使用命令行工具（需要Android SDK）

如果你有Android SDK但不想安装完整的Android Studio：

1. **下载Android SDK命令行工具**
   - 访问：https://developer.android.com/studio#command-tools
   - 下载命令行工具

2. **设置环境变量**
   ```bash
   export ANDROID_HOME=/path/to/android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

3. **安装SDK组件**
   ```bash
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

4. **构建APK**
   ```bash
   ./gradlew assembleDebug
   ```

5. **找到APK**
   - 在 `app/build/outputs/apk/debug/app-debug.apk`

---

## 📋 方法四：请朋友帮忙构建

如果你有朋友或同事安装了Android Studio，可以请他们帮忙：

1. 将整个项目文件夹发送给他们
2. 请他们用Android Studio打开项目
3. 构建APK文件
4. 将生成的APK文件发回给你

---

## ✅ 验证APK

构建完成后，确保：
- APK文件大小约为 5-10 MB
- 文件名：`app-debug.apk` 或 `app-release.apk`
- 可以正常安装到Android手机

## 🚀 安装APK到手机

1. **传输APK到手机**
   - 通过USB数据线
   - 通过微信/QQ发送
   - 通过云盘下载

2. **允许安装未知来源**
   - 在手机设置中找到"安全"或"隐私"
   - 启用"允许安装未知来源应用"
   - 选择你使用的文件管理器或浏览器

3. **安装APK**
   - 使用文件管理器找到APK文件
   - 点击APK文件
   - 点击"安装"
   - 等待安装完成

4. **运行应用**
   - 在应用列表中找到"数字搜索工具"
   - 点击打开即可使用

---

## ❓ 常见问题

**Q: 构建失败怎么办？**
A: 检查：
- 网络连接是否正常（需要下载依赖）
- Android SDK是否正确安装
- Gradle版本是否兼容

**Q: APK安装失败？**
A: 检查：
- 手机Android版本是否 >= 7.0
- 是否允许了"安装未知来源应用"
- APK文件是否完整

**Q: 应用打开后是空白页面？**
A: 检查assets目录中的文件是否完整：
- `index.html`
- `style.css`
- `app.js`

---

## 📝 注意事项

1. **首次构建可能需要较长时间**（下载依赖和SDK）
2. **确保网络连接稳定**（需要下载大量文件）
3. **APK文件可以分享给其他人使用**（无需重新构建）

