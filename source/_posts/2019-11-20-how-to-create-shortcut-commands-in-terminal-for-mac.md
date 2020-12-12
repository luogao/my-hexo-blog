---
title: Mac上Terminal如何设置快捷命令
date: 2019-11-20 10:43:33
tags:
---



利用`.bash_profile` 可以为Terminal 设置快捷命令

<!-- more -->


## 实现方法

- 打开你的 `.bash_profile` 文件

  在Mac 中打开Terminal ,键入 `vim ~/.bash_profile`  便可用vim打开 .bash_profile , 键入`i` 进入编辑模式

- 拉到底部, 复制以下命令

  ```bash
  # Aliases
  # Establishing custom commands below
  alias edit="open ~/.bash_profile"
  ```

  注意代码块中的格式

- 保存编辑,重启Terminal, 键入 `edit` 验证是否快捷命令生效

- 结束



## 参考

- [How To Create Shortcut Commands in the Terminal for your Mac!](https://codeburst.io/how-to-create-shortcut-commands-in-the-terminal-for-your-mac-9e016e25e4d7)







