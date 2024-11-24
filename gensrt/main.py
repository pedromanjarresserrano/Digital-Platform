import time
import math
import ffmpeg
import logging
import uuid
import os

from multiprocessing import Process
from flask_cors import CORS,cross_origin
from faster_whisper import WhisperModel
from srt_to_vtt import srt_to_vtt
from flask import Flask, jsonify, request, make_response

logging.basicConfig(filename='MyLog.log',level=logging.DEBUG)

app = Flask(__name__)
CORS(app, resources={
    r"/*":{
        "origins":"*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
# %%

# language, segments = transcribe(audio=extracted_audio)


# %%
def format_time(seconds):
    hours = math.floor(seconds / 3600)
    seconds %= 3600
    minutes = math.floor(seconds / 60)
    seconds %= 60
    milliseconds = round((seconds - math.floor(seconds)) * 1000)
    seconds = math.floor(seconds)
    formatted_time = f"{hours:02d}:{minutes:02d}:{seconds:01d},{milliseconds:03d}"

    return formatted_time




# %%
def extract_audio(input_video, uuid_temp):
    extracted_audio = f"{uuid_temp}-audio-temp.wav"
    stream = ffmpeg.input(input_video)
    stream = ffmpeg.output(stream, extracted_audio)
    ffmpeg.run(stream, overwrite_output=True)
    return extracted_audio


# %%
# extracted_audio = extract_audio()


# %%
def transcribe(audio,input_video_name,path):
    try:
        model = WhisperModel("small")
        segments, info = model.transcribe(audio,language="en")
        language = info[0]
        print("Transcription language", info[0])
        segments = list(segments)
         # for segment in segments:
            # print(segment)
        #    print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
        subtitle_file = f"{path}\\{input_video_name}.{language}.srt"
        subtitle_filevtt_vtt = f"{path}\\{input_video_name}.{language}.vtt"
        text = ""
        for index, segment in enumerate(segments):
            segment_start = format_time(segment.start)
            segment_end = format_time(segment.end)
            text += f"{str(index+1)} \n"
            text += f"{segment_start} --> {segment_end} \n"
            text += f"{segment.text} \n"
            text += "\n"

        f = open(subtitle_file, "w")
        f.write(text)
        f.close()
        srt_to_vtt(subtitle_file, subtitle_filevtt_vtt)
        print(f"Finnished {audio}")
        os.remove(audio)
    except Exception as e:
        logging.info(e)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.before_request
def before_request():
    headers = {'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type'}
    if request.method.lower() == 'options':
        return jsonify(headers), 200
    
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route("/gensrt", methods=['POST', "OPTIONS"])
@cross_origin()
def gensrtReq():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "POST":
        try:
            uuid_temp = uuid.uuid4()
            req = request.get_json()
            split = req["path"].split("\\")
            split.pop()
            path = "\\".join(split)
            input_video = req["path"]
            input_video_name = split[-1]
            extracted_audio = extract_audio(input_video, uuid_temp)
            thread = Process(target = transcribe, args = (extracted_audio,input_video_name, path))
            thread.start()
            return _corsify_actual_response(jsonify({"status":'Processing'}))
        except Exception as err:
            logging.info(err)
            return "Oops!  That was an error.  Try again..."


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=5000)
# %%
