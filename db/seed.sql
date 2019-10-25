create table users(
    user_id serial primary key, 
    username varchar(100), 
    password varchar(250), 
    profile_pic varchar(250));

create table posts (
    post_id serial primary key, 
    post_title varchar(100), 
    post_image varchar(1000), 
    post_content varchar(1000));
