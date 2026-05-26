# AstrBot + 洛克王国插件部署手册

> 记录时间：2026-05-24  
> 场景：Windows 本机 Docker 调试 → 阿里云服务器 7×24 运行，个人微信私聊接入

---

## 一、项目说明

`astrbot_plugin_rocom` 是 **AstrBot 插件**，**不能单独** `python main.py` 运行。

```
手机微信（ClawBot）
        ↕
AstrBot（Docker 容器）
        ↕
astrbot_plugin_rocom（洛克查询插件）
```

- **ClawBot**：手机微信侧能力，用于个人微信扫码登录
- **AstrBot**：必须有一台 **持续在线** 的机器运行，电脑关机则机器人离线
- **私聊比群聊更安全**，建议先用私聊

---

## 二、本机 Windows 环境（可选，用于调试）

### 2.1 安装 Docker Desktop

- 安装 [Docker Desktop](https://docs.docker.com/get-docker/)，建议开启 WSL2
- 若报错 `copying distribution: Access is denied`：**以管理员身份运行** Docker Desktop

### 2.2 部署 AstrBot（本机）

```powershell
mkdir D:\workspace\astrbot
cd D:\workspace\astrbot

# 下载 compose 文件（PowerShell 里 curl 是别名，要用 curl.exe）
curl.exe -O https://raw.githubusercontent.com/NapNeko/NapCat-Docker/main/compose/astrbot.yml

docker compose -f astrbot.yml up -d
```

> 若只用 **微信**、不用 QQ，后续在服务器上可去掉 NapCat，只保留 AstrBot。

### 2.3 本机打包备份（迁移前）

**CMD：**

```cmd
cd /d D:\workspace\astrbot

# 先停容器，避免打包时数据不一致
docker compose -f astrbot.yml down

# CMD 可用 tar 打包
tar -a -c -f astrbot-backup.zip data astrbot.yml
```

**PowerShell 替代方案：**

```powershell
cd D:\workspace\astrbot
docker compose -f astrbot.yml down
Compress-Archive -Path .\data, .\astrbot.yml -DestinationPath .\astrbot-backup.zip -Force
```

---

## 三、服务器部署（阿里云 Linux）

### 3.1 安装 Docker

```bash
curl -fsSL https://get.docker.com | bash
sudo systemctl enable docker
sudo systemctl start docker

docker version
docker compose version
```

### 3.2 创建目录并上传备份

**本机上传：**

```powershell
scp D:\workspace\astrbot\astrbot-backup.zip root@<你的服务器IP>:/opt/astrbot/
```

**服务器解压：**

```bash
sudo mkdir -p /opt/astrbot
cd /opt/astrbot
unzip astrbot-backup.zip
# 若无 unzip：sudo apt install -y unzip
```

### 3.3 精简 compose（仅 AstrBot + 国内镜像）

国内服务器访问 Docker Hub 易超时，且 **不需要 NapCat（QQ）**。

覆盖 `/opt/astrbot/astrbot.yml`：

```yaml
services:
  astrbot:
    environment:
      - TZ=Asia/Shanghai
    image: m.daocloud.io/docker.io/soulter/astrbot:latest
    container_name: astrbot
    restart: always
    ports:
      - "6185:6185"
    volumes:
      - ./data:/AstrBot/data
```

### 3.4 启动

```bash
cd /opt/astrbot
docker compose -f astrbot.yml up -d
docker logs -f astrbot
```

**成功标志：** 日志出现 `AstrBot v4.x WebUI is ready` 及初始用户名密码。

### 3.5（可选）Docker 镜像加速

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json << 'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://hub-mirror.c.163.com"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

---

## 四、WebUI 与微信配置

### 4.1 访问 WebUI

**方式 A：公网访问**

- 阿里云安全组放行 **6185**
- 浏览器：`http://<服务器IP>:6185`

**方式 B：SSH 隧道（更安全，推荐）**

```powershell
ssh -L 6185:127.0.0.1:6185 root@<你的服务器IP>
```

浏览器：`http://127.0.0.1:6185`

### 4.2 首次登录

- 用户名：`astrbot`
- 密码：见 `docker logs astrbot` 中的 `Initial password`
- **登录后立即修改密码**

### 4.3 接入个人微信

1. WebUI → **机器人** → **+ 创建机器人**
2. 选择 **个人微信**
3. 填写 ID，勾选 **启用**
4. 手机微信扫码确认（需 iOS ≥ 8.0.70 / Android ≥ 8.0.69，含 ClawBot 能力）
5. 保存

> ⚠️ 迁移后登录态可能失效，需 **重新扫码**。

---

## 五、洛克王国插件配置

### 5.1 安装插件

**方式 A：WebUI 安装**

插件管理 → 搜索 `astrbot_plugin_rocom` → 安装

**方式 B：手动上传**

```powershell
scp -r D:\workspace\astrbot_plugin_rocom root@<服务器IP>:/opt/astrbot/data/plugins/
```

```bash
docker restart astrbot
```

### 5.2 插件配置（WebUI）

| 配置项 | 值 |
|--------|-----|
| `wegame_api_key` | `sk-xxxx`（请自行替换为有效 Key） |
| `api_base_url` | `https://wegame.shallow.ink`（默认） |

保存后：

```bash
docker restart astrbot
```

### 5.3 安装图片渲染依赖（容器内，必做）

```bash
docker exec -it astrbot pip install httpx playwright jinja2
docker exec -it astrbot playwright install chromium
docker exec -it astrbot playwright install-deps chromium
```

> 远行商人、档案等发图功能依赖 Playwright，每次 **新容器/换机** 都要重装。

### 5.4 常用指令

| 指令 | 说明 |
|------|------|
| `/洛克` | 帮助菜单 |
| `/洛克查蛋 精灵名` | 查蛋（无需登录） |
| `/洛克微信登录` | 绑定洛克账号 |
| `/洛克档案` | 个人档案（需先绑定） |
| `/远行商人` 或 `/yxsr` | 远行商人 |

---

## 六、常见问题排查

### 6.1 `Compress-Archive` 不是内部命令

- **原因：** 在 CMD 里执行了 PowerShell 命令
- **解决：** 用 PowerShell，或改用 `tar -a -c -f astrbot-backup.zip data astrbot.yml`

### 6.2 Docker 拉镜像 `i/o timeout`

- **原因：** 国内访问 Docker Hub 超时；compose 同时拉 NapCat
- **解决：** 去掉 NapCat，AstrBot 镜像改为 `m.daocloud.io/docker.io/soulter/astrbot:latest`

### 6.3 远行商人 401

```
401 请提供有效的认证凭证: API Key (X-API-Key)
```

- **原因：** `wegame_api_key` 未填或未生效
- **解决：** WebUI 填写 API Key → `docker restart astrbot`

### 6.4 Playwright 渲染失败

```
Executable doesn't exist at .../chrome-headless-shell
```

- **原因：** 未下载 Chromium 浏览器
- **解决：** 执行 [5.3](#53-安装图片渲染依赖容器内必做) 的三条 `docker exec` 命令

### 6.5 本机与服务器同时运行

**不要** 本机和服务器同时跑同一微信号的 AstrBot，会冲突或掉线。迁移成功后本机保持：

```powershell
cd D:\workspace\astrbot
docker compose -f astrbot.yml down
```

---

## 七、日常运维命令

```bash
# 查看容器状态
docker ps

# 查看日志
docker logs -f astrbot

# 重启
docker restart astrbot

# 停止
cd /opt/astrbot && docker compose -f astrbot.yml down

# 启动
cd /opt/astrbot && docker compose -f astrbot.yml up -d
```

---

## 八、定期备份（推荐）

```bash
cd /opt/astrbot
tar -czf astrbot-data-backup-$(date +%Y%m%d).tar.gz data astrbot.yml
```

下载到本机：

```powershell
scp root@<服务器IP>:/opt/astrbot/astrbot-data-backup-*.tar.gz D:\backup\
```

---

## 九、到期换机迁移 Checklist

适用于：阿里云续费贵 → 新购机器 → 整体迁移。

- [ ] 新机器安装 Docker
- [ ] 本机或旧服务器打包：`data` + `astrbot.yml`
- [ ] 上传到新机 `/opt/astrbot` 并解压
- [ ] 确认 `astrbot.yml` 使用 DaoCloud 镜像、仅 AstrBot 服务
- [ ] `docker compose -f astrbot.yml up -d`
- [ ] 容器内安装 Playwright 依赖（[5.3](#53-安装图片渲染依赖容器内必做)）
- [ ] WebUI 登录，检查/重扫个人微信
- [ ] 确认插件配置与 API Key
- [ ] 微信测试：`/洛克查蛋 喵喵`、`/远行商人`
- [ ] **旧机器停止 AstrBot**，避免双实例
- [ ] 更新 SSH 隧道或安全组中的 IP

**核心原则：** 值钱的只有 `data` 目录，容器可随时重建。

---

## 十、参考链接

- [AstrBot Docker 部署文档](https://docs.astrbot.app/deploy/astrbot/docker.html)
- [AstrBot 接入个人微信](https://docs.astrbot.app/platform/weixin_oc.html)
- [astrbot_plugin_rocom 仓库](https://github.com/Entropy-Increase-Team/astrbot_plugin_rocom)

---

*笔记整理自实际部署过程，可按环境（IP、路径）自行替换。*
