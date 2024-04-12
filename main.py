import pandas as pd

pd.set_option('display.max_columns', None)

data = pd.read_csv("Houses.csv", encoding='latin2')
data.drop(columns=['no'], inplace=True)

print(data)