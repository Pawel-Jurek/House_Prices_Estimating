import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

pd.set_option('display.max_columns', None)

data = pd.read_csv("Houses.csv", encoding='latin2')
data.drop(columns=['no'], inplace=True)

print(data)

model = LinearRegression()
data_encoded = pd.get_dummies(data)

X = data_encoded.drop(columns=['price'])
y = data_encoded['price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Błąd średniokwadratowy (MSE):", mse)
print("Średni błąd bezwzględny (MAE):", mae)
print("Współczynnik determinacji (R^2):", r2)