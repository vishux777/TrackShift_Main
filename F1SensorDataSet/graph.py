import matplotlib.pyplot as plt
import pandas as pd
df = pd.read_csv("latency.csv")

time = df["time"]
bw = df["bandwidth_mbps"]
plt.figure(figsize=(14, 6))
smooth_bw = bw.rolling(5, center=True).mean()
plt.plot(time, smooth_bw, linewidth=2.5, label="Smoothed Bandwidth", alpha=0.9)
plt.scatter(time, bw, s=25, alpha=0.5, label="Raw Samples")
plt.title("Bandwidth Over Time", fontsize=20, fontweight="bold")
plt.xlabel("Time (seconds)", fontsize=14)
plt.ylabel("Bandwidth (Mbps)", fontsize=14)
plt.grid(alpha=0.3, linestyle="--")
plt.tight_layout()
plt.legend(fontsize=12)

plt.show()
