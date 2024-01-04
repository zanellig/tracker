CREATE TABLE users (
    user_id BIGSERIAL UNIQUE PRIMARY KEY NOT NULL,
    auth_provider VARCHAR(64) NOT NULL,
    user_name VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL,
    has_accepted_terms BOOLEAN NOT NULL DEFAULT false,
    thoughts SMALLINT [] DEFAULT ARRAY[]::SMALLINT [],
    todos SMALLINT [] DEFAULT ARRAY[]::SMALLINT [],
    goals SMALLINT [] DEFAULT ARRAY[]::SMALLINT []
);

CREATE TABLE thoughts (
    thought_id SMALLSERIAL UNIQUE PRIMARY KEY NOT NULL,
    generated_by_user_id BIGINT REFERENCES users (user_id) NOT NULL,
    thought_body VARCHAR(512) NOT NULL UNIQUE,
    date_generated DATE NOT NULL,
    time_generated TIMESTAMP WITH timezone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    todo_id SMALLSERIAL UNIQUE PRIMARY KEY NOT NULL,
    generated_by_user_id BIGINT REFERENCES users (user_id) NOT NULL,
    todo_title VARCHAR(64) NOT NULL,
    todo_body TEXT NOT NULL,
    todo_date DATE NOT NULL,
    todo_time TIME NOT NULL,
    is_mandatory BOOLEAN NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT false,
    happens_again BOOLEAN NOT NULL DEFAULT false,
    repeats_every TEXT DEFAULT null,
    repeats_until TIMESTAMP DEFAULT null::TIMESTAMP,
    has_exceptions BOOLEAN NOT NULL DEFAULT false,
    exception_intervals INTERVAL [] DEFAULT null,
    exception_timestamps TIMESTAMP DEFAULT null
    -- we have exeption timestamps to know where the user wants 
    -- to create exceptions for his todos
);

CREATE TABLE goals (
    goal_id SMALLSERIAL UNIQUE PRIMARY KEY NOT NULL,
    generated_by_user_id BIGINT REFERENCES users (user_id) NOT NULL,
    goal_body VARCHAR(128) NOT NULL,
    progress_percentage NUMERIC(5, 4) NOT NULL DEFAULT 0,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    repeats BOOLEAN NOT NULL DEFAULT false,
    days_a_week SMALLINT DEFAULT 7,
    repeat_on_days VARCHAR(10) [] DEFAULT ARRAY[
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ]
);

SET timezone = 'UTC';

-- commands run to alter local db
-- ALTER TABLE thoughts 
-- ADD CONSTRAINT unique_thought_body UNIQUE (thought_body);
-- this resets the thoughts array
-- UPDATE users SET thoughts = ARRAY[]::SMALLINT[]; 
