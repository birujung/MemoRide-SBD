const tourSchema = `
CREATE TABLE IF NOT EXISTS tours (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) UNIQUE NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  distance NUMERIC NOT NULL,
  photo VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  max_group_size INTEGER NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)`;

export default tourSchema;