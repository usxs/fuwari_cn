const fs = require('fs');
const path = require('path');

// 获取 GitHub Action 传过来的 Issue 内容
const issueBody = process.env.ISSUE_BODY;
const filePath = path.join(__dirname, '../src/content/links.json');

// 正则解析 Issue（匹配：名称、链接、头像、简介）
const name = issueBody.match(/### 网站名称\s*(.*)/)?.[1]?.trim();
const url = issueBody.match(/### 网站链接\s*(.*)/)?.[1]?.trim();
const avatar = issueBody.match(/### 头像链接\s*(.*)/)?.[1]?.trim();
const bio = issueBody.match(/### 网站简介\s*(.*)/)?.[1]?.trim();

if (name && url) {
    const links = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    links.push({ name, url, avatar: avatar || '', bio: bio || '' });
    fs.writeFileSync(filePath, JSON.stringify(links, null, 2));
    console.log(`成功添加友链: ${name}`);
} else {
    console.error("解析失败，请检查 Issue 格式");
    process.exit(1);
}