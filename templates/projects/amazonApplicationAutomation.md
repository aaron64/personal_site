
# Amazon Application Automation
## Finding a Job With Scripts
---
During my job hunt, I have been applying to many postings at Amazon, unfortunately, even through filtering job type, and location, there were over 4000 job postings

<img src="/static/images/amazonApplicationAutomation/number_of_jobs.png">

Fortunately, amazon sends the application data through JSON requests

<img src="/static/images/amazonApplicationAutomation/browser_network.png">

The request only displays 10 items, luckily I found a limit in the requests URL

```result_limit=10```

So I increased the limit to get more data...

```result_limit=4000```

Finally, I wrote a python script to quickly read through each job that doesn't include some key words ("n years of industry experience", "manager", etc.)


<pre>
<code>
import json
import webbrowser

bq_blacklist = ["industry experience", "professional software", "professional experience", "years in enterprise", "masters degree", "Ph.D degree"]
title_blacklist = ["Sr.", "Senior", "Manager"]

with open("amazon_listings.txt", encoding="utf8", errors="ignore") as f:
    data = json.load(f)
    for listing in data:
        valid = True
        for bq_b in bq_blacklist:
            if bq_b in listing["basic_qualifications"]:
                valid = False
                break

        for title_b in title_blacklist:
            if title_b in listing["title"]:
                valid = False
                break

        if valid:
            print("\n\n\n\n\n")
            print(listing["title"])
            print("____________________________________")
            print()
            print("Description:")
            print(listing["description"])
            print()
            print("Qualifications:")
            print(listing["basic_qualifications"])
            print()
            apply_input = ""
            while apply_input is not "y" and apply_input is not "n":
                apply_input = input("Apply? (y/n)")
                print(apply_input)
            if apply_input is "y":
                webbrowser.open(listing["url_next_step"])
</code>
</pre>

* Replying "n" skips to the next listing
* Replying "y" opens the application in browser
