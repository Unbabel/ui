# timer 
Tracks time and if a given limit has been passed Supports pause, reset and continue 



## props 
- `tick` ***Number*** (*optional*) `default: 1000` 
Number of miliseconds the Timer will wait before incrementing the elapsedTime 

- `auto-start` ***Boolean*** (*optional*) `default: false` 
If the Timer starts counting as soon as it's mounted 

- `starting-time` ***Number*** (*optional*) 
Time that the Timer starts counting from 

- `limit` ***Number*** (*optional*) `default: null` 
Number of seconds the Timer will wait before emitting an event 

- `always-show-hours` ***Boolean*** (*optional*) `default: false` 
If the hours should always be shown in the Timer 

- `invisible` ***Boolean*** (*optional*) `default: false` 
If the Timer should not be shown 


## data 
- `elapsedTime` 
 *initial value:* `0` 

- `interval` 
 *initial value:* `'undefined'` 

## computed properties 
- `formatedTime` This is the description for the formatedTime 
 *dependencies:* `elapsedTime` `elapsedTime` `elapsedTime` `alwaysShowHours` 

## events 
- `passed-limit` also sends the value of the limit 

## methods 
- `start()` 
Start the Timer 

- `pause()` 
Pause the Timer 

- `reset()` 
Starts the timer again from 0 

- `stop()` 
Pauses the Timer and puts it at 0 

- `setElapsedTime(time)` 
In case you need to change the elapsedTime value 

- `warnPassingOfLimit()` 


