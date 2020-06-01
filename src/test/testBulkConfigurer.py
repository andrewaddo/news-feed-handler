import sys
sys.path.insert(0, '.')

from src.bulkConfigurer import BulkConfigurer

bulkConfigurer = BulkConfigurer('d19dfbc6-c20f-4340-97d0-46cbf9031aa3', 'data/SUS-FinTech-customers.csv', 'SearchConfig-366jdi7ct5atxn6pvsm5baxoji-prod')

bulkConfigurer.updateDB()