local logger = require("logger")
local millennium = require("millennium")
local utils = require("utils")

local function plugin_dir()
    local backend = (utils.get_backend_path() or "."):gsub("\\", "/")
    return backend:match("^(.+)/[^/]+$") or backend
end

local SETTINGS_FILE = plugin_dir() .. "/settings.json"

function GetSettings()
    return utils.read_file(SETTINGS_FILE) or "{}"
end

function SaveSettings(settings_json)
    if type(settings_json) ~= "string" or settings_json == "" then
        return "0"
    end
    if utils.write_file(SETTINGS_FILE, settings_json) then
        return "1"
    end
    return "0"
end

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

local function on_unload()
    safe_call("unload", function()
        logger:info("Leetify Extension: Plugin unloading...")
        logger:info("Leetify Extension: Plugin unloaded successfully")
    end)
end

return {
    on_load = on_load,
    on_unload = on_unload,
    GetSettings = GetSettings,
    SaveSettings = SaveSettings
}
