import pandas as pd
import os
from sqlalchemy import create_engine

postgres_engine = create_engine('postgresql://postgres:12345678@localhost/climate_db')

dirname = os.path.dirname(__file__)
temperature_file = os.path.join(dirname, "data\Environment_Temperature_change_E_All_Data_NOFLAG.csv")
country_file = os.path.join(dirname, "data\FAOSTAT_data_11-24-2020.csv")

# Load the dataset
temperature_data = pd.read_csv(temperature_file, encoding="ISO-8859-1")
faostat_data = pd.read_csv(country_file, encoding="ISO-8859-1")

# Insert data into PostgreSQL
temperature_data.to_sql('temperature_change', postgres_engine, if_exists='replace', index=False)
faostat_data.to_sql('faostat_data', postgres_engine, if_exists='replace', index=False)

