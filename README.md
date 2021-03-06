# Zway-AutoOffInactive

This module will automatically turn off selected devices (such as switches
or dimmers) after no movement or activity has been detected for a defined period.

For more advanced use-cases you could check out the MotionTrigger module at
https://github.com/maros/Zway-MotionTrigger.

# Configuration

## sensors

Multiple binary sensors that indicate activity or human presence.

## devices

Multiple binary switches or dimmers that should be turned off after
a given inactivity period

## timeout

Timeout period in minutes. Will turn off all devices n-minutes after the last
activity was reported from the sensors.

## delay

Optionally sets a delay (in minutes) to skip inactivity checks after a device
has been turned on manually

# Events

No events are emitted

# Virtual Devices

No virtual device is created

# Installation

Make sure that the BaseModule is installed prior to installing this module
( https://github.com/maros/Zway-BaseModule )

The prefered way of installing this module is via the "Zwave.me App Store"
available in 2.2.0 and higher. For stable module releases no access token is
required. If you want to test the latest pre-releases use 'k1_beta' as
app store access token.

For developers and users of older Zway versions installation via git is
recommended.

```shell
cd /opt/z-way-server/automation/userModules
git clone https://github.com/maros/Zway-AutoOffInactive.git AutoOffInactive --branch latest
```

To update or install a specific version
```shell
cd /opt/z-way-server/automation/userModules/AutoOffInactive
git fetch --tags
# For latest released version
git checkout tags/latest
# For a specific version
git checkout tags/1.02
# For development version
git checkout -b master --track origin/master
```

# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
