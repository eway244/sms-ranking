INSERT INTO users (username, password, phone, real_name, class, is_verified) VALUES
('user1', '$2b$10$EIXZ5Z1Z5Z5Z5Z5Z5Z5Z5O', '13800000001', '张三', '班级A', 0),
('user2', '$2b$10$EIXZ5Z1Z5Z5Z5Z5Z5Z5Z5O', '13800000002', '李四', '班级B', 1),
('admin', '$2b$10$EIXZ5Z1Z5Z5Z5Z5Z5Z5Z5O', '13800000003', '管理员', '班级C', 1);

INSERT INTO categories (name, description) VALUES
('技术讨论', '讨论各种技术问题'),
('生活交流', '分享生活中的点滴');

INSERT INTO posts (title, content, user_id, category_id, created_at) VALUES
('如何学习JavaScript', 'JavaScript是一门非常有用的编程语言...', 1, 1, NOW()),
('Vue.js的使用心得', '在使用Vue.js的过程中...', 2, 1, NOW());

INSERT INTO comments (post_id, user_id, content, created_at) VALUES
(1, 2, '我觉得JavaScript很有趣！', NOW()),
(2, 1, 'Vue.js确实很方便！', NOW());

INSERT INTO ratings (post_id, user_id, score, comment, created_at) VALUES
(1, 1, 8.5, '很好的帖子！', NOW()),
(2, 2, 9.0, '非常有帮助！', NOW());