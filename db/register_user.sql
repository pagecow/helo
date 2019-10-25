insert into users (email, password, profile_pic) 
values ($1, $2, $3)
returning user_id, email, profile_pic;