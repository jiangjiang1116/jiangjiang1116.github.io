# node后端

1. 模型名与数据表命名问题
2. 为什么要用迁移？
3. 种子是必须的吗？
4. 已经自建数据表了，如何使用 ORM？
5. Node 项目的调试技巧

##  模型名与数据表命名问题

模型为什么是单数，表名为什么是复数？这里其实很多东西，都是ORM里约定成俗的做法。

模型代表的是单个对象的实例，所以用单数。
数据表里，因为要存很多数据，所以就用复数了。

### 模型是单数
当我们使用命令，创建一个叫做Article的模型的时候，自动生成的迁移文件里，表名默认已经被设定成了Articles了。当我们用了Article模型查询数据，那么Sequelize ORM，就会自动去数据库里，找一张叫做的Articles表。这一切都是Sequelize ORM默认约定好了的。

### 表名的大小写
另外表名首字母要大写。大家使用Windows开发，如果没有用课程里讲的Docker方法运行MySQL，而是直接安装或是使用了集成环境。当你运行迁移后，你的表名应该是小写的。在开发过程中，小写表名是是可以正常运行。

但将来我们部署到Linux服务器后，MySQL会严格区分大小写，这就会导致程序报错，提示找不到对应的表了。那也不要紧，部署时，可以在服务上重新运行迁移。或者将本地SQL文件导入到服务器上后，手动将表名改为大写命名也行。

## 为什么要用迁移？
为什么要写迁移？直接手动建表不行吗？你当然可以自己手动建表，建各个字段，只要命名符合Sequelize ORM的规范就可以，迁移并不是必须的！

我们之所以用迁移，有很多好处，最重要的是因为以下几个原因：

当把代码交给别人的时候，无需给别人 SQL 文件。尤其是发布到 Github 这种地方到时候，其他人通过说明文档，自己运行迁移命令，就会自动建表了，这样多好。
团队开发需要。当你建了一个迁移文件，大家git pull后，运行一下迁移命令，所有人得到的都是相同的表结构。就不用当你修改了数据表的一个字段后，还要一个个通知团队的小伙伴们，所有人都要去改一下数据表了。
部署需要。在服务器上，也只需要运行一下迁移命令，数据库就自动新建或更新数据表了。就不用连接到服务器上的数据库后，人工去修改表了。
虽然编写迁移文件是比较麻烦，但是还是请大家认真对待，这是非常规范的做法。

# 种子是必须的吗？
再来说说种子的作用，它也不是必须的。

种子可以用来初始化默认数据。例如我们之前系统设置数据、初始管理员数据，这里用种子就非常好。当其他用户拿到项目源码了，他通过说明文档，运行了种子文件，这样就会自动生成初始数据，这样在调用接口时，就不会出错了。
再就是需要大量数据测试的情况，用种子文件批量填充数据也是非常方便的。

# 自己已经有表了，如何使用 Sequelize ORM？
有的同学问到，如果已经有数据表了，能否使用Sequelize来操作数据库呢？当然可以的，但这里有几个地方要注意



例如我们在数据库中，已经有了一张叫做clwy_posts的表。表里的字段非常简单，大家可以自己建一下。也可用课程讲义里的 sql 语句，直接去数据库客户端跑一下也行

CREATE TABLE `clwy_posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `clwy_posts` (`id`, `name`, `category_id`)
VALUES
    (1,'天生我材必有用',1),
    (2,'一天能吃三斤肉',2);
这张表的命名显然是不符合Sequelize规范的。
里面关联分类表的字段是下划线命名，也不符合命名规范。
而且里面还缺少createdAt和updatedAt时间字段。
我们现在来生成一下它的模型

sequelize model:generate --name Post --attributes category_id:integer,name:string
注意，生成模型的时候，同时也会生成迁移文件。但是我们现在已经有数据表了，不需要再去建表了，所以将迁移文件直接删掉。

## 自定义表名
模型的名字，我们叫做Post。这明显和数据表对不上，但是没关系，不要紧。增加tableName，指定好模型对应的表名即可。

Post.init({
  category_id: DataTypes.INTEGER,
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'clwy_posts',    // 指定表名
});
## 没有时间字段
另外我们这张表，没有时间字段，不需要createdAt和updatedAt，继续增加配置

Post.init({
  category_id: DataTypes.INTEGER,
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'clwy_posts',    // 指定表名
  timestamps: false           // 不需要时间
});
## 设置关联外键
我们的Post模型，它与是属于分类的。但是关联字段叫做category_id，明显也不符合默认关联字段的命名。没有关系，定义一个一对多关联，只需要用foreignKey定义一下，关联的字段叫什么名字就可以了。

static associate(models) {
  // define association here
  models.Post.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
}
## 路由文件
到这里为止，模型就全部改造完成了。我们添加个路由测试下，新建routes/posts.js

const express = require('express');
const router = express.Router();
const { Post, Category } = require('../models');
const { success, failure } = require('../utils/responses');

/**
 * GET /posts
 */
router.get('/', async function (req, res) {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });
    success(res, '查询成功。', { posts });
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
这里就做了个简单的查询，还关联查询了对应的分类。

## 引用路由
app.js中添加路由引用

const postsRouter = require('./routes/posts');

// ...

app.use('/posts', postsRouter);
直接用浏览器访问：http://127.0.0.1:3000/posts



当前表的数据和关联的分类，都非常顺利的查出来了。可见，自己建的，命名完全不规范的表，也是可以使用 ORM 来操作的。

# Node 项目调试技巧
最后一个问题，在开发中，经常碰到一些错误，但是又找不到问题在哪。这里给大家做个演示啊，例如我们将刚才定义的foreignkey删掉，

models.Post.belongsTo(models.Category, { as: 'category' });
再去读取接口，肯定会报错，这里的错误提示还算清晰。但有些时候，报错信息不清不楚的，导致非常难以判断。

我们可以在命令行里，复制实际运行的 SQL 语句。拿到后打开数据库客户端软件，直接丢进去运行。通过实际 SQL 的报错信息，可以帮助我们找到问题所在。



还有些时候，需要接受数据后，再插入数据库。例如新增个分类



看看命令行里，发现插入的数据都是?号，具体接收到了什么值，完全看不到。这如果出错了，就不好调试了



解决方法也很简单，大家打开数据库配置的config/config.json，增加"logQueryParameters": true

"development": {
  "username": "root",
  "password": "clwy1234",
  "database": "clwy_api_development",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "timezone": "+08:00",
  "logQueryParameters": true
},
再次添加一个分类看看，名字改为测试2，命令行里可以看到具体接受到的数据了。



我们将这里显示的语句复制一下，随便打开个记事本，粘贴过来。用后面的值，替换掉前面的问号，改为

INSERT INTO `Categories` (`id`,`name`,`rank`,`createdAt`,`updatedAt`) VALUES (DEFAULT, "测试2", "99", "2024-06-17 23:47:56", "2024-06-17 23:47:56"); 
这样就可以得到真正运行的 SQL 语句了，接着还是同样的方法，又可以去数据库客户端里运行，检查错误了。

6. 总结一下
模型是单数，表名是复数，是 Sequelize 里默认约定的做法。
迁移和种子不是必须的，只是推荐的规范做法。
如果手动的建表，也可以使用模型操作数据库。
可以将命令行显示的SQL语句，拿到数据库客户端中运行，排查项目错误位置。
完成课程内容后，请大家将测试用的表、模型、路由都清理掉。