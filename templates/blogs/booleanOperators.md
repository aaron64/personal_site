
I am currently fasinated by boolean operators, as they can be used in programming to:

* Run algorithms faster
* Use less space
* Create more elegant code.

Here are three examples to demonstrate those advantages.

## Create more elegant code 
When I was learning Android development in high school, I came across some code in Google's documentation that boggled my mind

```
mTextEditor.setInputType(TYPE_TEXT_FLAG_AUTO_COMPLETE | TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
```

It appears that this line has 2 arguments, however the deliminator is a '|' instead of a ','
But this line was also completely valid

```
mTextEditor.setInputType(TYPE_TEXT_FLAG_MULTI_LINE);
```

And this one

```
mTextEditor.setInputType(TYPE_NUMBER_VARIATION_PASSWORD | TYPE_NUMBER_FLAG_SIGNED | TYPE_NUMBER_FLAG_DECIMAL);
```

This was really weird to me, why are the arguments separated by pipes? And how are there a variable amount of arguments in Java at all (I did not know about variable-length argument lists (however these were not that))

After some research I realized the '|' character denoted the OR operator, and upon further investigation I found that almost all of these values were roots of 2.

<table class="table">
	<tr>
		<td>Variable</td>
		<td>Dec</td>
		<td>Bin</td>
	</tr>
	<tr>
		<td>TYPE_DATETIME_VARIATION_TIME</td>
		<td>32</td>
		<td>100000</td>
	</tr>
	<tr>
		<td>TYPE_CLASS_TEXT</td>
		<td>1</td>
		<td>000001</td>
	</tr>
	<tr>
		<td>TYPE_CLASS_DATETIME</td>
		<td>4</td>
		<td>000100</td>
	</tr>
</table>

So setInputType takes in 1 integer, and on the other side processes it (with AND operators) to retrieve the correct settings.

<pre>
<code>
setInputType(TYPE_NUMBER_VARIATION_PASSWORD | TYPE_NUMBER_FLAG_SIGNED | TYPE_NUMBER_FLAG_DECIMAL);
-> setInputType(00000000010000 | 01000000000000 | 10000000000000);
-> setInputType(11000000010000);
</code>
</pre>

The Android side would look something like this:

<pre>
<code>
setInputType(int settings) {
	...
	numberVariationPassword = settings & 16
	...
	numberFlagSigned = settings & 2048
	numberFlagDecimal = settings & 4096
}
</code>
</pre>

This way of setting multiple booleans at once is much more elegant than passing an array or calling setType for each value

## Using less space
One of the most simple operations we run into is the swap:

<pre>
<code>
# x = 7, y = 2
temp = x 	# temp = 7
x = y 		# x = 2
y = temp 	# y = temp = 7
print(x, y)
</code>
</pre>
2, 7

We can reduce the space used (no temp) by doing add swap:

<pre>
<code>
# x = 7, y = 2
x = x + y 	# x = 9
y = x - y	# y = 7
x = x - y	# x = 2

print(x, y)
</code>
</pre>
2, 7

However, boolean operators usually are a little faster than addition:

<pre>
<code>
# x = 7, y = 2
x = x XOR y	# x = 5
y = x XOR y	# y = 7
x = x XOR y	# x = 2

print(x, y)
</code>
</pre>
2, 7

Now we have made our code a little faster and use a little less space!

## Faster algorithms
While practicing interview questions, I recently ran into a problem that went something like:
"Find the one integer in an array that does not appear twice, your solution should run in O(n) time and use O(1) space."

I found the constraint hard to work with, it makes the obvious hashmap solution in my head unusable. I decided to look into boolean operators and found 2 properties that I found very helpful:

a XOR a = 0
a XOR 0 = a

By iterating through the array and XORing everything together, all the duplicates will cancel out and I will be left with the single element that I needed. Pure magic.

<pre>
<code>
int val = 0
for(int i = 0; i < arr.length; i++) {
	val ^= arr[i]	# val XOR = arr[i]
}
return val
</code>
</pre>

arr = [2, 6, 7, 7, 2]

<table class="table">
	<tr>
		<td>i</td>
		<td></td>
		<td>1</td>
		<td>2</td>
		<td>3</td>
		<td>4</td>
		<td>5</td>
		<td></td>
	</tr>
	<tr>
		<td>arr[i]</td>
		<td></td>
		<td>2</td>
		<td>6</td>
		<td>7</td>
		<td>7</td>
		<td>2</td>
		<td></td>
	</tr>
	<tr>
		<td>val</td>
		<td>0</td>
		<td>2</td>
		<td>4</td>
		<td>3</td>
		<td>4</td>
		<td>6</td>
		<td>6</td>
	</tr>
</table>