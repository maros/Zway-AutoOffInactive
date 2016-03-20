/*** AutoOffInactive Z-Way HA module *******************************************

Version: 1.02
(c) Maroš Kollár, 2015
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
    var limit           = now - self.config.timeout * 60;
    var lastActivity    = 0;
    
    // Get current temperature from most recent measurement
    self.processDeviceList(self.config.sensors,function(deviceObject) {
        var level   = deviceObject.get('metrics:level');
        var last    = deviceObject.get('metrics:modificationTime') || 1;
        
        if (level === 'on') {
            lastActivity = now;
        } else if (last > lastActivity) {
            lastActivity = last;
        }
    });
    
    if (lastActivity < limit) {
        self.processDeviceList(self.config.devices,function(deviceObject) {
            if (deviceObject.get('metrics:auto') === true) return; // Something else is managing this device
            
            var level       = deviceObject.get('metrics:level');
            var deviceType  = deviceObject.get('deviceType');
            
            if (deviceType === 'switchBinary') {
                level = (level === 'on') ? true:false;
            } else if (deviceType === 'switchMultilevel') {
                level = (level > 0) ? true:false;
            }
            
            //self.log(deviceObject.id+' -> '+level+ ' -> '+deviceObject.get('metrics:level'));
            if (level === true) {
                self.log('Switching off device '+deviceObject.id+' after inactivity (last activity at '+lastActivity+')');
                deviceObject.performCommand('off'); 
            }
        });
    }
};