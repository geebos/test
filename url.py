import requests
import time
import os
import execjs
import redis
from urllib import parse


with open('tmts.js', 'r', encoding='utf-8') as f:
    tmts = execjs.compile(f.read())

conn_redis = redis.Redis(host='127.0.0.1', port=6379,db=3)

def get_video_list():
    url = 'https://pub.m.iqiyi.com/h5/mina/hot/0/1/?uid=72fd040fff18d325c7b6cd842afa3fac&ppuid='
    headers = {
        'ontent-type':'application/json',
        'Pragma':'no-cache',
        'Referer':'https://servicewechat.com/wx71da41485390bb12/devtools/page-frame.html',
    }

    r = requests.get(url, headers=headers)
    
    video_list = r.json()['data']['feeds']

    result = []
    for video in video_list:
        temp = {}
        temp['tvId'] = video['tvId']
        temp['tvTitle'] = video['tvTitle']
        temp['palyCount'] = video['playCount']
        temp['wallType'] = video['wallType']
        temp['agreeCount'] = video['agreeCount']
        temp['commentCount'] = video['commentCount']
        temp['sharedCount'] = video['sharedCount']
        temp['uvCount'] = video['uvCount']
        temp['sourceType'] = video['sourceType']
        temp['pubStr'] = video['pubStr']
        temp['feedId'] = video['feedId']
        temp['wallId'] = video['wallId']
        result.append(temp)
    return result

def get_video_url(tv_id):
    vid = '5179d51af88ca6cd0eb3eec0c2c36b4d'
    headers = {
        'ontent-type':'application/json',
        'Host':'cache.m.iqiyi.com',
        'Pragma':'no-cache',
        'Referer':'https://servicewechat.com/wx71da41485390bb12/devtools/page-frame.html',
    }
    data = parse.urlencode({
        'uid': '',
        'platForm': 'h5',
        'qyid': 'bcbc1ed362d1b2846b39185c5a37211f',
        'agenttype': 236,
        'ptid': '02028001010000000000',
        'type': 'mp4',
        'nolimit': 0,
        'k_ft1': 8,
        'rate': 2,
        'p': '',
        'deviceid': 'bcbc1ed362d1b2846b39185c5a37211f',
        'codeflag': 1,
        'qd_v': 1,
        'qdy': 'u',
        'qds': 0,
        'tm': str(int(time.time())),
        'src': '02028001010000000000',
    })

    url = f'https://cache.m.iqiyi.com/tmts/{tv_id}/{vid}/?'+data
    url = url+'&vf='+tmts.call('e', f'/tmts/{tv_id}/{vid}/?'+data)

    r = requests.get(url, data=data)

    return r.json()['data']['m3u']

def check_or_create_dir(path):
    os.s

def download_video(video, filepath='videos'):
    video_url = get_video_url(video['tvId'])

    r = requests.get(video_url)
    check_or_create_dir(filepath);
    with open

def dump_data(video):
    tv_id = video['tvId']
    required_items = ['tvId', 'tvTitle', 'palyCount', 'wallType',
                      'agreeCount', 'commentCount', 'sharedCount',
                      'uvCount', 'sourceType', 'pubStr', 'feedId', 'wallId']
    for item in required_items:
        conn_redis.hset(tv_id, item, video[item])
        











    
t = get_video_url('26857666309')
