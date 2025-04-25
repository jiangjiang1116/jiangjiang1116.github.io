---
title: nginx
date: 2023-10-11 16:30:02
tags: 运维
categories: Notes
---
了解了一些nginx相关知识，nginx一般用来负载均衡，说白了就是减轻压力。在一些大型项目中对于这种需要用到多节点高可用的情况更多的是通过 **集群** 的方式来解决高可用的问题，业内常用的就是我们常听到的 `Kubernetes（k8s）`。k8s中默认的网关层 `ingress` 就是使用 nginx 来搭建的。

k8s的搭建貌似是**运维**相关，以后再说吧。

相关链接：
[前端开发者必备的Nginx知识](https://juejin.cn/post/6844903793918738440)
[作为一名前端，该如何理解Nginx？](https://juejin.cn/post/7082655545491980301)
[前端到底用nginx来做啥](https://juejin.cn/post/7064378702779891749)

# 自我总结

## nginx基本配置

**“nginx是一个高性能的反向代理服务器”=>什么是正向代理与反向代理=>nginx配置**

```nginx
events { 

}

http 
{
    server
    { 
        location path
        {
            ...
        }
        location path
        {
            ...
        }
     }

    server
    {
        ...
    }

}
```

- `main`:nginx的全局配置，对全局生效。
- `events`:配置影响nginx服务器或与用户的网络连接。
- `http`：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
- `server`：配置虚拟主机的相关参数，一个http中可以有多个server。
- `location`：配置请求的路由，以及各种页面的处理情况。
- `upstream`：配置后端服务器具体地址，负载均衡配置不可或缺的部分。

### 内置变量

下面是`nginx`一些配置中常用的内置全局变量，你可以在配置的任何位置使用它们。

| 变量名             | 功能                                                         |
| ------------------ | ------------------------------------------------------------ |
| `$host`            | 请求信息中的`Host`，如果请求中没有`Host`行，则等于设置的服务器名 |
| `$request_method`  | 客户端请求类型，如`GET`、`POST`                              |
| `$remote_addr`     | 客户端的`IP`地址                                             |
| `$args`            | 请求中的参数                                                 |
| `$content_length`  | 请求头中的`Content-length`字段                               |
| `$http_user_agent` | 客户端agent信息                                              |
| `$http_cookie`     | 客户端cookie信息                                             |
| `$remote_port`     | 客户端的端口                                                 |
| `$server_protocol` | 请求使用的协议，如`HTTP/1.0`、·HTTP/1.1`                     |
| `$server_addr`     | 服务器地址                                                   |
| `$server_name`     | 服务器名称                                                   |
| `$server_port`     | 服务器的端口号                                               |

**在哪用到=>反向代理=>跨域**

### nginx解决跨域的原理

例如：

- 前端server的域名为：`fe.server.com`
- 后端服务的域名为：`dev.server.com`

现在我在`fe.server.com`对`dev.server.com`发起请求一定会出现跨域。

现在我们只需要启动一个nginx服务器，将`server_name`设置为`fe.server.com`,然后设置相应的location以拦截前端需要跨域的请求，最后将请求代理回`dev.server.com`。如下面的配置：

```nginx
server {
        listen       80;
        server_name  fe.server.com;
        location / {
                proxy_pass dev.server.com;
        }
}
```

这样可以绕过浏览器的同源策略：`fe.server.com`访问`nginx`的`fe.server.com`属于同源访问，而`nginx`对服务端转发的请求不会触发浏览器的同源策略。

## 常见场景

### 请求过滤

根据状态码过滤

```nginx
error_page 500 501 502 503 504 506 /50x.html;
    location = /50x.html {
        #将跟路径改编为存放html的路径。
        root /root/static/html;
    }
```

根据URL名称过滤，精准匹配URL，不匹配的URL全部重定向到主页。

```nginx
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

根据请求类型过滤。

```nginx
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
        return 403;
    }
```

### 负载均衡

这块可以参考之前的[集群]([Sinbad (jiangjiang1116.cn)](https://jiangjiang1116.cn/2023/10/08/集群/))

### gzip压缩

缩小**静态资源**体积大小，带来相当可观的流量与带宽节省

```nginx
http {
    # 开启gzip
    gzip on;
    # 增加响应头”Vary: Accept-Encoding” 用来给浏览器识别
    gzip_vary on;
    # Nginx做为反向代理的时候启用： any – 无条件压缩所有结果数据
    gzip_proxied any;
    # 压缩等级
    gzip_comp_level 6;
    # 需要压缩的资源
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
}
```

### 图片防盗链

```nginx
server {
  listen       80;
  server_name  *.sherlocked93.club;

  # 图片防盗链
  location ~* .(gif|jpg|jpeg|png|bmp|swf)$ {
    valid_referers none blocked 172.168.1.1;  # 只允许本机 IP 外链引用
    if ($invalid_referer){
      return 403;
    }
  }
}
```

### 优雅降级-奇怪的名字

Nginx的"优雅降级"指的是在服务器负载较高或出现问题时，通过一种**平滑、非突然**的方式减少或限制服务的资源使用，以确保系统稳定性和可用性。这种方式被称为"优雅"。

因为它不会导致服务器立刻停止响应请求，而是逐渐降低服务的负载，确保已经接受的请求能够正常完成，同时不再接受新的请求。

Nginx支持优雅降级的方式，主要通过以下几个技术来实现：

1. **平滑重载**: Nginx允许在不停止服务的情况下重新加载配置文件。这意味着您可以修改配置文件，例如调整负载均衡策略，而不需要重启Nginx。这有助于平滑地调整服务器的行为。
2. **权重调整**: Nginx支持为不同的后端服务器或上游服务器池分配权重，您可以逐渐降低某个服务器的权重，从而逐渐将流量从该服务器中剥离。
3. **限速和连接限制**: 您可以使用Nginx的限速配置来控制每个客户端的请求速率，以确保不会因过多的请求而导致服务器负载过高。
4. **故障转移**: Nginx还支持故障转移和健康检查机制，当某个后端服务器出现故障时，它可以自动将流量转移到其他健康的服务器上，而不会影响整个服务。

SSR服务端渲染由于是依赖服务器资源，在流量过大的情况下，有可能会出现服务不可用的情况，返回特殊的错误码例如500等。这时候我们可以实现优雅降级，利用 nginx 做对应的流量分发，当SSR页面返回异常错误的时候，nginx会将流量导入到CSR页面当中。

优雅降级需要`proxy_intercept_errors`来开启自定义错误捕获功能，用`error_page`指令来手动进行降级指向备用地址。

```nginx
upstream ssrserver {
    server xxx max_fails=1 fail_timeout=60;
    server xxx max_fails=1 fail_timeout=60;
 }


# 服务端渲染
server {
    listen 80;
    server_name  ssr-website.com.com;

    location / {
        proxy_pass http://ssrserver;
        # 开启自定义错误捕获 如果这里不设置为on的话 会走向nginx处理的默认错误页面
        proxy_intercept_errors on;
        # 捕获500系列错误 如果500错误的话降级为下面的csr渲染
        error_page 500 501 502 503 504 = @csr_location

        # error_page 500 501 502 503 504 = 200 @csr_location
        # 注意这上面的区别 等号前面没有200 表示 最终返回的状态码已 @csr_location为准 加了200的话表示不管@csr_location返回啥都返回200状态码
    }

    location @csr_location {
        proxy_pass http://csr-website.com.com;
        rewrite_log on;
    }

}

# 客户端渲染
server {
    listen 80;
    server_name  csr-website.com.com;

    location / {
        index  index.html index.htm;
    }
}
```

#### webp根据浏览器自动降级为png

这套方案不像常见的由nginx把png转为webp的方案，而是先经由图床系统（node服务）上传两份图片:

1. 一份是原图png
2. 一份是png压缩为webp的图片（使用的是imagemin-webp）

然后通过nginx检测头部是否支持webp来返回webp图片，不支持的话就返回原图即可。这其中还做了错误拦截，如果**cos桶丢失webp图片及时浏览器支持webp也要降级为png**

```nginx
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  # 设置日志格式
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"'
  '"$proxy_host" "$upstream_addr"';

  access_log  /var/log/nginx/access.log  main;

  sendfile        on;
  keepalive_timeout  65;

  # 开启gzip
  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

  # 负载均衡 这里可以是多个cos桶地址即可
  upstream static_env {
    server xxx;
    server xxx;
  }

  # map 设置变量映射 第一个变量指的是要通过映射的key值 Accpet 第二个值的是变量别名
  map $http_accept $webp_suffix {
    # 默认为 空字符串
    default   "";
    # 正则匹配如果Accep含有webp字段 设置为.webp值
    "~*webp"  ".webp";
  }
  server {

    listen 8888;
    absolute_redirect off;    #取消绝对路径的重定向
    #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
    root /usr/share/nginx/html;

    location / {
      index index.html index.htm;
      proxy_set_header Host $host;
      try_files $uri $uri/ /index.html;
      add_header Cache-Control 'no-cache, max-age=0';
    }

    # favicon.ico
    location = /favicon.ico {
      log_not_found off;
      access_log off;
    }

    # robots.txt
    location = /robots.txt {
      log_not_found off;
      access_log off;
    }

    # 
    location ~* .(png|jpe?g)$ {
      # Pass WebP support header to backend
      # 如果header头部中支持webp
      if ($webp_suffix ~* webp) {
        # 先尝试找是否有webp格式图片
        rewrite ^/(.*).(png|jpe?g)$ /$1.webp break;
        # 找不到的话 这里捕获404错误 返回原始错误 注意这里的=号 代表最终返回的是@static_img的状态吗
        error_page 404 = @static_img;
      }
      proxy_intercept_errors on;
      add_header Vary Accept;
      proxy_pass http://static_env;
      proxy_set_header Host $http_host;
      expires 7d;
      access_log off;
    }

    location @static_img {
      #set $complete $schema $server_addr $request_uri;
      rewrite ^/.+$ $request_uri break;
      proxy_pass http://static_env;
      proxy_set_header Host $http_host;
      expires 7d;
    }


    # assets, media
    location ~* .(?:css(.map)?|js(.map)?|gif|svg|jfif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
      proxy_pass http://static_env;
      proxy_set_header Host $http_host;
      expires 7d;
      access_log off;
    }


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
  }
}
```
