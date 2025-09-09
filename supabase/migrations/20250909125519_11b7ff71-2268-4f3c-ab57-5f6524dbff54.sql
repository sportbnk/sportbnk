-- Create departments for executive roles
INSERT INTO departments (name) VALUES 
('CEO'),
('COO'), 
('Commercial Director'),
('Director of Football'),
('Sporting Director'),
('Chairman'),
('President')
ON CONFLICT (name) DO NOTHING;