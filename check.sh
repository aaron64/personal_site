CURRENTBRANCH=$(git status|awk 'NR==1{print $3}');

if [ ! "$CURRENTBRANCH"=="master" ]; then
    echo -e "Not on master - cannot proceed, please change to master by using:\ngit checkout master"
    exit 1
fi

# Check whether the current working branch is ahead, behind or diverged from remote master, and exit if we're not using the current remote master
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ "$LOCAL"=="$REMOTE" ]; then
    echo "Working branch is up-to-date with remote master, proceeding...."
elif [ "$LOCAL"=="$BASE" ]; then
    echo -e "Your working branch is behind the remote branch, you need to run:\ngit pull"
    exit 1
elif [ "$REMOTE"=="$BASE" ]; then
    echo -e "Your working branch is ahead of the remote branch, you need to run:\ngit push origin master"
    exit 1
else
    echo "Your working branch has diverged from the remote master, cannot continue"
    exit 1
fi
