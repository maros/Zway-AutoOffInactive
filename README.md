# Zway-AutoOffInactive

This module turns off devices after a defined time of inactivity. Activity
can be measured using multiple binary sensors/devices, like movement sensors
or switches.

# Configuration

## sensors

Multiple binary sensors that indicate activity.

## devices

List of devices that should be switches

## timeout

Timeout period in minutes

# Events

No events are emitted

# Virtual Devices

No virtual device is created

# Installation

Make sure that the BaseModule is installed prior to installing this module 
( https://github.com/maros/Zway-BaseModule )


```shell
cd /opt/z-way-server/automation/modules
git clone https://github.com/maros/Zway-WindowControl.git WindowControl --branch latest
```

To update or install a specific version
```shell
cd /opt/z-way-server/automation/modules/WindowControl
git fetch --tags
# For latest released version
git checkout tags/latest
# For a specific version
git checkout tags/1.02
# For development version
git checkout -b master --track origin/master
```

Alternatively this module can be installed via the Z-Wave.me app store. Just
go to Management > App Store Access and add 'k1_beta' access token.

# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any 
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
