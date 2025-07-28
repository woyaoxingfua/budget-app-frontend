# Budget App Frontend

这是一个个人预算管理应用的前端部分。用户可以注册、登录、添加交易、查看其预算和历史记录。

## 主要功能

- **用户认证**: 注册和登录功能。
- **预算管理**: 设置和查看您的总预算。
- **交易跟踪**: 添加新的支出或收入交易。
- **历史记录**: 查看所有过去的交易列表。
- **可视化显示**: 以图形方式显示您的资金。

## 技术栈

- **Vue.js**: 渐进式 JavaScript 框架。
- **Vite**: 下一代前端开发与构建工具。
- **Vue Router**: 为 Vue.js 提供的官方路由。
- **Pinia**: Vue.js 的官方状态管理库。
- **Axios**: 基于 Promise 的 HTTP 客户端。
- **JavaScript (ES6+)**

## 项目设置

1.  **克隆仓库**
    ```bash
    git clone https://github.com/woyaoxingfua/budget-app-frontend.git
    cd budget-app-frontend
    ```

2.  **安装依赖**
    ```bash

    npm install
    ```

3.  **配置环境变量**

    将根目录下的 `.env.example` 文件复制一份并重命名为 `.env`。然后，根据您的后端 API 地址修改 `.env` 文件中的 `VITE_API_URL`。

    ```
    # .env
    VITE_API_URL=http://your-backend-api-url/api
    ```

4.  **启动开发服务器**
    ```bash
    npm run dev
    ```

## 项目截图
![Project Screenshot](/image.png)

## 作者

- **github-woyaoxingfua**
- GitHub: `https://github.com/woyaoxingfua`

## 许可证

本项目采用 [MIT 许可证](LICENSE) 授权。
