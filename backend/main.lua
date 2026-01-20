local logger = require("logger")
local millennium = require("millennium")

local function safe_call(label, fn)
    local ok, err = pcall(fn)
    if not ok then
        logger:error(string.format("Leetify Extension: %s failed: %s", label, tostring(err)))
    end
end

local function on_load()
    safe_call("load", function()
        logger:info("Leetify Extension: Starting plugin initialization...")
        millennium.ready()
        logger:info("Leetify Extension: Plugin loaded successfully")
    end)
end

local function on_frontend_loaded()
    safe_call("frontend load", function()
        logger:info("Leetify Extension: Frontend loaded successfully")
        -- Add any frontend-specific initialization logic here if needed
    end)
end

local function on_unload()
    safe_call("unload", function()
        logger:info("Leetify Extension: Plugin unloading...")
        -- Add any cleanup logic here if needed
        logger:info("Leetify Extension: Plugin unloaded successfully")
    end)
end

return {
    on_load = on_load,
    on_frontend_loaded = on_frontend_loaded,
    on_unload = on_unload
}