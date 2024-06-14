import csv
import os
import sys
import django
from django.core.management import call_command

current_path = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_path, '..', 'apartament_valuation'))
print(project_root)
print(current_path)

sys.path.insert(0, project_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "apartament_valuation.settings")

django.setup()

from valuation.models import Apartment

def import_csv(file_path):
    print(file_path)
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            Apartment.objects.create(
                district=row['address'],
                city=row['city'],
                floor=float(row['floor']),
                price=float(row['price']),
                rooms=float(row['rooms']),
                sq=float(row['sq']),
                year=float(row['year']),
                price_per_sq=float(row['price_per_sq'])
            )
    print("Dane zostały pomyślnie zaimportowane z pliku CSV.")

if __name__ == "__main__":
    csv_file_path = os.path.join(project_root, '..', 'modeling', 'actual_df.csv')
    print(csv_file_path)
    import_csv(csv_file_path)
