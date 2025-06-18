# OpenJudge-Art

OpenJudge 的美化样式。

受到 [PKU-Art](https://github.com/zhuozhiyongde/PKU-Art) 的启发，大体沿用了其基本框架。

## 使用方法

注意，由于需要对原页面 DOM 元素进行修改，因此本插件仅支持 js 版本。

1. 在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/) 插件。
2. 在 release 页面下载最新的 js 发布版。
3. 在 Tampermonkey 中添加此新脚本。

## 贡献

使用方法：

1. 克隆本仓库：

    ```bash
    git clone https://github.com/LeoDreamer2004/OpenJudge-Art
    cd OpenJudge-Art
    ```

2. 安装依赖：

    ```bash
    pnpm install
    ```

3. 开发时运行：

    ```bash
    pnpm run dev
    ```

    打开 Vite 开发服务器后，油猴即会自动安装开发用脚本，由此即可热更新开发。

4. 打包发布：

    ```bash
    pnpm run build
    ```

本项目尚在施工中，欢迎 PR。
