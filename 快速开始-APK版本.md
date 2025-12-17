# 🚀 快速开始 - APK版本

## 📱 目标：生成可以在手机上安装的APK文件

---

## ⭐ 最简单的方法：GitHub Actions（推荐）

### 为什么推荐这个方法？
- ✅ **完全免费**
- ✅ **无需安装Android Studio**（约1GB）
- ✅ **无需配置Android SDK**
- ✅ **可以在任何电脑上操作**
- ✅ **5-10分钟即可完成**

### 步骤（5分钟搞定）：

#### 1. 注册GitHub账号（1分钟）
- 访问：https://github.com
- 点击右上角 "Sign up" 注册
- 验证邮箱

#### 2. 创建仓库并上传项目（2分钟）
- 登录后，点击右上角 "+" → "New repository"
- 仓库名：`number-search-app`（任意名称）
- 选择 "Public"
- 点击 "Create repository"
- 点击 "uploading an existing file"
- **将整个项目文件夹拖拽上传**（包括所有文件和文件夹）
- 点击 "Commit changes"

#### 3. 运行构建（2分钟）
- 在仓库页面，点击 "Actions" 标签
- 点击 "Build APK" workflow
- 点击右侧 "Run workflow" 按钮
- 点击绿色的 "Run workflow" 按钮
- 等待5-10分钟

#### 4. 下载APK（1分钟）
- 构建完成后，点击运行记录
- 在页面底部找到 "Artifacts" 部分
- 点击 "app-debug-apk" 下载
- 解压zip文件，里面就是APK文件！

#### 5. 安装到手机
- 将APK文件发送到手机（微信、QQ等）
- 在手机上允许"安装未知来源应用"
- 点击APK文件安装
- 完成！🎉

---

## 💻 方法二：使用Android Studio

### 前提：需要安装Android Studio（约1GB）

#### 步骤：

1. **下载Android Studio**
   - 访问：https://developer.android.com/studio
   - 下载并安装

2. **打开项目**
   - 启动Android Studio
   - "Open an Existing Project" → 选择本项目文件夹

3. **等待同步**（首次10-30分钟）
   - 等待Gradle同步完成

4. **构建APK**
   - `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`

5. **找到APK**
   - `app/build/outputs/apk/debug/app-debug.apk`

---

## 📋 方法三：请朋友帮忙

如果你有朋友安装了Android Studio：

1. 将整个项目文件夹发送给他
2. 请他打开项目并构建APK
3. 让他把APK文件发回给你

---

## ✅ 验证APK

构建成功后，APK文件应该：
- 文件名：`app-debug.apk`
- 大小：约 5-10 MB
- 可以正常安装到Android手机

---

## 📲 安装到手机步骤

1. **传输APK**
   - USB数据线
   - 微信/QQ发送
   - 云盘下载

2. **允许安装未知来源**
   - 设置 → 安全 → 允许安装未知来源应用

3. **安装**
   - 点击APK文件 → 安装

4. **使用**
   - 在应用列表找到"数字搜索工具"
   - 打开即可使用！

---

## ❓ 遇到问题？

### GitHub Actions构建失败？
- 检查文件是否完整上传
- 确保 `.github/workflows/build.yml` 文件存在

### APK安装失败？
- 确保手机Android版本 >= 7.0
- 检查是否允许了"安装未知来源应用"

### 应用打开后空白？
- 检查assets目录中的文件是否完整

---

## 🎉 完成！

现在你有了一个可以在手机上安装的APK文件！

APK可以：
- ✅ 分享给朋友
- ✅ 安装到多台手机
- ✅ 像普通应用一样使用

---

**需要更详细的说明？查看 `README-APK构建.md`**

