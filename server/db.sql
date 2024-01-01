CREATE TABLE users (
    user_id BIGSERIAL UNIQUE PRIMARY KEY NOT NULL,
    auth_provider VARCHAR(64) NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    has_accepted_terms BOOLEAN NOT NULL DEFAULT false,
    thoughts SMALLSERIAL [],
    todos SMALLSERIAL [],
    goals SMALLSERIAL []
);

CREATE TABLE thoughts (
    thought_id SMALLSERIAL UNIQUE PRIMARY KEY NOT NULL,
    generated_by_user_id BIGSERIAL REFERENCES users (user_id) NOT NULL,
    thought_body VARCHAR(512) NOT NULL,
    date_generated DATE NOT NULL,
    time_generated TIME NOT NULL
);

CREATE TABLE todos (
    todo_id SMALLSERIAL UNIQUE PRIMARY KEY NOT NULL,
    generated_by_user_id BIGSERIAL REFERENCES users (user_id) NOT NULL,
    todo_title VARCHAR(64) NOT NULL,
    todo_body TEXT NOT NULL,
    todo_date DATE NOT NULL,
    todo_time TIME NOT NULL,
    is_mandatory BOOLEAN NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT false,
    happens_again BOOLEAN NOT NULL DEFAULT false,
    repeats_every TEXT DEFAULT null,
    repeats_until TIMESTAMP DEFAULT infinity,
    has_exceptions BOOLEAN NOT NULL DEFAULT false,
    exception_intervals INTERVAL [] DEFAULT null,
    exception_timestamps TIMESTAMP DEFAULT null
);

CREATE TABLE goals (
    goal_id SMALLSERIAL UNIQUE PRIMARY KEY NOT NULL,
    generated_by_user_id BIGSERIAL REFERENCES users (user_id) NOT NULL,
    goal_body VARCHAR(128) NOT NULL,
    progress_percentage NUMERIC(5, 4) NOT NULL DEFAULT 0,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    repeats BOOLEAN NOT NULL DEFAULT false,
    days_a_week SMALLINT DEFAULT 7,
    repeat_on_days VARCHAR(10) [] DEFAULT [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ]
);
