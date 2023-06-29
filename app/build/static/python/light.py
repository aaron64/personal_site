from magichome import MagicHomeApi
import sys
import subprocess

#subprocess.call("./switch_to_led.sh", shell=True)

controller = MagicHomeApi('10.10.123.3', 0)
print(controller.get_status())

command = sys.argv[1]
if len(sys.argv) >= 5:
    r = sys.argv[2]
    g = sys.argv[3]
    b = sys.argv[4]

if command == "on":
    controller.turn_on()
elif command == "off":
    controller.turn_off()
elif command == "color":
    controller.update_device(int(r), int(g), int(b), 50)

#subprocess.call("./switch_to_eth.sh", shell=True)
