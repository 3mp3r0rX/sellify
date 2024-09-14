INSERT INTO categories (category_name) 
VALUES 
    ('cars'),
    ('real estate'),
    ('electronics'),
    ('furniture'),
    ('pets')
ON CONFLICT (category_name) DO NOTHING;