CREATE TABLE components (
    component_id SERIAL PRIMARY KEY,  -- Unique ID for each component
    type VARCHAR(100) NOT NULL,       -- Type of the component (e.g., Resistor)
    value VARCHAR(100) NOT NULL,      -- The value of the component (e.g., 10kΩ for a resistor)
    description TEXT,                 -- Detailed description (optional)
    stock INT,              -- Available stock, default to 0
    status VARCHAR(50) DEFAULT 'In Stock',  -- Status (optional: 'In Stock', 'Low', etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of when the component was added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp of last update
);

ALTER TABLE components ADD COLUMN reorder_level INT DEFAULT 5;  -- Add reorder level (default to 5)

CREATE OR REPLACE FUNCTION update_status_on_reorder()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the stock is less than or equal to reorder level
    
	IF NEW.stock = 0 THEN
		NEW.status := 'Out of Stock';
	ELSIF NEW.stock <= NEW.reorder_level THEN
        -- Update the status to "Low"
        NEW.status := 'Low';
    ELSE
        -- If stock is greater than reorder level, set status back to "In Stock"
        NEW.status := 'In Stock';
    END IF;
    -- Return the updated row
	UPDATE components 
    SET status = NEW.status
    WHERE component_id = NEW.component_id;
	
	RAISE NOTICE 'Status updated to: %', NEW.status;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER stock_status_update
AFTER UPDATE OF stock ON components
FOR EACH ROW
EXECUTE FUNCTION update_status_on_reorder();

INSERT INTO components (type, value, description, stock, status, reorder_level) VALUES
('Resistor', '1kΩ', '1kΩ 1/4W Carbon Film Resistor', 100, 'In Stock', 10),
('Resistor', '10kΩ', '10kΩ 1/4W Carbon Film Resistor', 50, 'In Stock', 5),
('Capacitor', '100nF', '100nF Ceramic Capacitor', 200, 'In Stock', 20),
('Capacitor', '220nF', '220nF Electrolytic Capacitor', 30, 'Low', 10),
('Potentiometer', '100kΩ', '100kΩ Linear Potentiometer', 150, 'In Stock', 15),
('Potentiometer', '10kΩ', '10kΩ Audio Potentiometer', 40, 'Low', 5),
('Diode', '1N4007', '1N4007 Standard Rectifier Diode', 75, 'In Stock', 10),
('Transistor', '2N2222', '2N2222 NPN Transistor', 60, 'In Stock', 5),
('Capacitor', '1µF', '1µF Electrolytic Capacitor', 120, 'In Stock', 15),
('Resistor', '100kΩ', '100kΩ 1/4W Carbon Film Resistor', 25, 'Low', 5);


SELECT * FROM components
UPDATE components
SET stock = 0
WHERE component_id=3
