import random
import praw
import re, string;
import sys
import time
pattern = re.compile('[\W_|\_|\-|\.]+')
fix = re.compile(r'(D / O)')
fix2 = re.compile(r'(O / D)')
r = praw.Reddit('Tagpro Test')
defense = set()
offense = set()
do = set()
od = set()
unknown = []
seen = set()
rejections = []
def reject(comment):
    try:
        print "Rejecting %s" % comment.body
        return
        #comment.reply("Please make sure your signup matches the following format: `Tagpro Username: Position`\n\nPosition can be O, D, D/O, or O/D. Any other responses will not be recorded. Please delete your comment and reply in the proper format. **Note**: Editing will not record your response, it ***must*** be a new comment.")
        #if comment in rejections:
        #    rejections.remove(comment)
    except Exception as e:
        print e
        if comment not in rejections:
            rejections.append(comment)
while True:
    try:
        sub = r.get_submission(submission_id='2npqqz') #id in signup thread url
        for comment in sub.comments:
            if comment.id not in seen:
                seen.add(comment.id)
                if comment.body.lower().rstrip() == "[deleted]":
                    continue
                if not re.match("(.+):(d\/o|o\/d|d|o|)", comment.body.lower().rstrip()):
                    print comment.body.lower().rstrip()
                    reject(comment)
                else:
                    nc = comment.body.split(":")
                    name = nc[0]
                    position = nc[1].lstrip().rstrip()
 
                    if position.lower() not in ['d', 'o', 'd/o', 'o/d']:
                        reject(comment)
                        continue
                    if position.lower() == 'd':
                        defense.add(name)
                        print "Added {} to defense".format(name)
                    elif position.lower() == 'o':
                        offense.add(name)
                        print "Added {} to offense".format(name)
                    elif position.lower() == 'd/o':
                        do.add(name)
                        print "Added {} to d/o".format(name)
                    elif position.lower() == 'o/d':
                        od.add(name)
                        print "Added {} to o/d".format(name)
        with open("positions.txt", "w") as f:
            for x in defense:
                f.write(x+",d")
                f.write("\n")
            for x in offense:
                f.write(x+",o")
                f.write("\n")
            for x in do:
                f.write(x+",do")
                f.write("\n")
            for x in od:
                f.write(x+",od")
                f.write("\n")
        print 'sleeping'
        time.sleep(3)
        for rejected in rejections:
            reject(rejected)
        break
    except Exception as e:
        print "WHOA NELLY!"
        print e
        continue


_d = []
_o = []
_do = []
_od = []

with open("positions.txt") as f:
    for l in f.readlines():
        name, pos = l.rstrip().split(",")
        if pos == 'd':
            _d.append(name)
            print "Appending"
        if pos == 'o':
            _o.append(name)
        if pos == 'do':
            _do.append(name)
        if pos == 'od':
            _od.append(name)

print _d
print _o
print _do
print _od