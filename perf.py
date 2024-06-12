import yfinance as yf
import pandas as pd
import yaml


# Load ticker symbols from YAML file
with open('./spudweb/data/ticker.yaml', 'r') as yaml_file:
    ticker_symbols = yaml.safe_load(yaml_file)['tickers']

# Define the periods to get data for
periods = ["1d", "5d", "1mo", "3mo", "6mo", "ytd", "1y", "2y"]

# Initialize a DataFrame to store the price performance
price_performance = pd.DataFrame(columns=periods)

# Fetch the required data and calculate the price performance for each ticker symbol and period
for ticker_symbol in ticker_symbols:
    # Fetch historical market data
    ticker_data = yf.Ticker(ticker_symbol)
    
    # Temporary list to store period performance for the current ticker
    period_performance = []
    
    for period in periods:
        # Get historical market data for the specified period
        hist_data = ticker_data.history(period=period)
        
        # Calculate the percentage change in the closing price
        if len(hist_data) > 0:
            start_price = hist_data.iloc[0]['Close']
            end_price = hist_data.iloc[-1]['Close']
            percent_change = ((end_price - start_price) / start_price) * 100
            period_performance.append(f"{percent_change:.2f}%")
        else:
            period_performance.append(None)  # Handle cases where no data is available
    
    # Append the performance data to the DataFrame
    price_performance.loc[ticker_symbol] = period_performance

# Save the DataFrame to a CSV file
price_performance.to_csv('./spudweb/data/perf.csv')

print("Performance data saved to perf.csv")

# Display the price performance table
print(price_performance)
