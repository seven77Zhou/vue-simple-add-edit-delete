# vue-simple-add-edit-delete
使用vue+bootstrap+mysql+node+express制作简易增删改，涉及到前台后台数据交互

涉及到的数据库语言较简单，增删改查：
增：
INSERT INTO hero_data.msg_table VALUES(1,'鲁班七号','射手')，对应变量
---> INSERT INTO hero_data.msg_table VALUES(${id},'${name}','${skill}'),注意字符串变量需要添加引号，否则报错

查：
SELECT * FROM msg_table ORDER BY ID DESC LIMIT ${n},${PAGE_SIZE} ， ----->涉及到查询结果倒序，查询部分数据，即从n开始查PAGE_SIZE个

删：
DELETE FROM msg_table WHERE ID=${id}

改：
UPDATE msg_table SET name='${name}',skill='${skill}' WHERE ID=${id};
