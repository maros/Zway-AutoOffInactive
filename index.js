/*** AutoOffInactive Z-Way HA module *******************************************

Version: 1.04
(c) Maroš Kollár, 2015-2017
-----------------------------------------------------------------------------
Author: Maroš Kollár <maros@k-1.com>
Description:
    AutoOffInactive module

******************************************************************************/

function AutoOffInactive (id, controller) {
    // Call superconstructor first (AutomationModule)
    AutoOffInactive.super_.call(this, id, controller);

    this.interval   = undefined;
}

inherits(AutoOffInactive, BaseModule);

_module = AutoOffInactive;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

AutoOffInactive.prototype.init = function (config) {
    AutoOffInactive.super_.prototype.init.call(this, config);

    var self = this;

    self.interval = setInterval(_.bind(self.checkInactivity,self),1000*60);
};

AutoOffInactive.prototype.stop = function () {
    var self = this;

    clearInterval(self.interval);

    AutoOffInactive.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

AutoOffInactive.prototype.checkInactivity = function () {
    var self = this;

    var now             = parseInt((new Date()).getTime() / 1000);
    var limit           = now - (self.config.timeout * 60);
    var delay           = now - (self.config.delay * 60);
    var lastActivity    = 0;

    // Get last activity
    self.processDeviceList(self.config.sensors,function(deviceObject) {
        var level   = deviceObject.get('metrics:level');
        var last    = deviceObject.get('metrics:modificationTime') || 1;

        if (level === 'on') {
            lastActivity = now;
        } else if (last > lastActivity) {
            lastActivity = last;
        }
    });

    if (lastActivity === 0) {
        self.error('No activity at all detected. Something is odd.');
    // Last activity reaced limit
    } else if (lastActivity < limit) {
        self.processDeviceList(self.config.devices,function(deviceObject) {
            if (deviceObject.get('metrics:auto') === true) return; // Something else is managing this device

            var modTime     = deviceObject.get('metrics:modificationTime');
            var level       = deviceObject.get('metrics:level');
            var deviceType  = deviceObject.get('deviceType');

            if (deviceType === 'switchBinary') {
                level = (level === 'on') ? true:false;
            } else if (deviceType === 'switchMultilevel') {
                level = (level > 0) ? true:false;
            }

            //self.log(deviceObject.id+' -> '+level+ ' -> '+deviceObject.get('metrics:level'));
            if (level === true) {
                if (modTime <= delay) {
                    self.log('Switching off device '+deviceObject.id+' after inactivity (last activity at '+lastActivity+', turned on at '+modTime+')');
                    deviceObject.performCommand('off');
                } else {
                    self.log('Not switching off device '+deviceObject.id+' yet. (last activity at '+lastActivity+', turned on at '+modTime+')');
                }
            }
        });
    } else {
        //self.log('Detected recent activity. (last activity at '+lastActivity+', limit '+limit+')');
    }
};