# save this as app.py
import os
import json
import numpy as np
import pandas as pd

from flask import Flask, request
from flask_cors import CORS, cross_origin

from scipy.stats import mannwhitneyu

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return {"res":"Hello, World!"}

@app.route("/myname/<name>")
def hello2(name):
    return f"Hello{name}"

@app.route("/FileCount/<A>/<B>")
def getFilesCount(A,B):

    A=A.replace("~~~","/")
    B=B.replace("~~~","/")
 
    if os.path.exists(A) and os.path.exists(B):
        
        quant_a_files=[x for x in os.listdir(A) if ("_MOUSE.Quant.csv") in x] 
        quant_b_files=[x for x in os.listdir(B) if ("_MOUSE.Quant.csv") in x]
        
        rateconst_a_files=[x for x in os.listdir(A) if ("_MOUSE.RateConst.csv") in x] 
        rateconst_b_files=[x for x in os.listdir(B) if ("_MOUSE.RateConst.csv") in x] 

        return {"A_Quant":len(quant_a_files),"B_Quant":len(quant_b_files),
        "A_RateConst":len(rateconst_a_files),"B_RateConst":len(rateconst_b_files)}
    else:
        return 'No data available'

@app.route("/AnalyzedProtiens/<A>/<B>")
def AnalyzedProtiens(A,B):
    
    A=A.replace("~~~","/")
    B=B.replace("~~~","/")
 
    if os.path.exists(A) and os.path.exists(B):
        data_a= pd.read_csv(A+"/Analyzed_Proteins_and_Their_Rates.csv")
        data_b= pd.read_csv(A+"/Analyzed_Proteins_and_Their_Rates.csv")
        merged_AB_data=data_a.merge(data_b, on="Proteins",suffixes=["_A","_B"])
        U1, p = mannwhitneyu(merged_AB_data[[" RateConstant_A"]], merged_AB_data[[" RateConstant_B"]])

        return {"A_summary":json.loads(data_a.describe().to_json()),"B_summary":json.loads(data_b.describe().to_json()),
        "A_rateconst":list(merged_AB_data[" RateConstant_A"]),
        "B_rateconst":list(merged_AB_data[" RateConstant_B"]),
        "r":f'{merged_AB_data[[" RateConstant_A"," RateConstant_B"]].corr()[" RateConstant_A"][" RateConstant_B"]:.2f}',
        "stat":f'{float(U1):.1f}',
        "p":f'{float(p):.3f}'}

    else:
        return 'No data available'