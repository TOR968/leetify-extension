local logger = require("logger")
local millennium = require("millennium")

local function _plugin_dir()
    local src = debug.getinfo(1, "S").source or ""
    if src:sub(1, 1) == "@" then
        src = src:sub(2)
    end
    src = src:gsub("\\", "/")
    return src:match("^(.+)/backend/") or "."
end

local _SETTINGS_FILE = _plugin_dir() .. "/settings.json"

local function _read_file(path)
    local f = io.open(path, "r")
    if not f then
        return nil
    end
    local body = f:read("*a")
    f:close()
    return body
end

local function _write_file(path, content)
    local f = io.open(path, "w")
    if not f then
        return false
    end
    f:write(content)
    f:close()
    return true
end

function GetSettings()
    return _read_file(_SETTINGS_FILE) or "{}"
end

function SaveSettings(settings_json)
    if type(settings_json) ~= "string" or settings_json == "" then
        return "0"
    end
    if _write_file(_SETTINGS_FILE, settings_json) then
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

local function on_frontend_loaded()
    safe_call("frontend load", function()
        logger:info("Leetify Extension: Frontend loaded successfully")
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
    on_frontend_loaded = on_frontend_loaded,
    on_unload = on_unload
}