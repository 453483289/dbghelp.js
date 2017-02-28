'use strict';

const printf = require('cprintf').printf;
const sprintf = require('cprintf').sprintf;
const KdPrint = require('cprintf').KdPrint;

const assert = require('assert');

const path = require('path');

const ref = require('ref');
const sizeof = require('ref-sizeof');
const struct = require('ref-struct');
//const union = require('ref-union');
//const array_t = require('ref-array');

const ffi = require('ffi');
const arch_x64 = (process.arch === 'x64');

var lib_dbghelp = null;

if ( arch_x64 )
{
    lib_dbghelp = ffi.DynamicLibrary( path.resolve( path.basename( __dirname) , './bin/amd64/dbghelp.dll') );
}
else
{
    lib_dbghelp = ffi.DynamicLibrary( path.resolve( path.basename( __dirname) , './bin/i386/dbghelp.dll') );
}

var declare_table = {
// "DbgHelpCreateUserDumpW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "EnumDirTreeW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "EnumerateLoadedModules" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "EnumerateLoadedModules64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "EnumerateLoadedModulesExW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "EnumerateLoadedModulesW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ExtensionApiVersion" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "FindDebugInfoFile" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "FindDebugInfoFileExW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "FindExecutableImage" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "FindExecutableImageExW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "FindFileInPath" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "FindFileInSearchPath" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "GetTimestampForLoadedLibrary" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImageDirectoryEntryToData" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImageDirectoryEntryToDataEx" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImageNtHeader" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImageRvaToSection" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImageRvaToVa" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImagehlpApiVersion" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "ImagehlpApiVersionEx" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "MakeSureDirectoryPathExists" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "MapDebugInformation" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "MiniDumpReadDumpStream" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "MiniDumpWriteDump" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SearchTreeForFileW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "StackWalk" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "StackWalk64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymAddSourceStreamA" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymAddSourceStreamW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymAddSymbolW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

   "SymCleanup" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymDeleteSymbolW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumLinesW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumProcesses" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumSourceFileTokens" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumSourceFilesW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumSourceLinesW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumSym" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumSymbolsForAddrW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumSymbolsW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumTypesByNameW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumTypesW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumerateModules" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumerateModules64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumerateModulesW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumerateSymbols64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumerateSymbolsW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymEnumerateSymbolsW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFindDebugInfoFileW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFindExecutableImageW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFindFileInPathW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

 "SymFromAddrW" : [ "int" ,  [ "void*" , "ulonglong" , "void*" , "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFromIndexW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFromNameW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFromTokenW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFunctionTableAccess" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymFunctionTableAccess64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetFileLineOffsets64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetHomeDirectoryW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineFromAddr" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineFromAddr64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineFromAddrW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineFromName" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineFromName64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineFromNameW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineNext" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineNext64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLineNextW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLinePrev" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLinePrev64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetLinePrevW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetModuleBase" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetModuleBase64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetModuleInfo64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetModuleInfoW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetModuleInfoW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetOmapBlockBase" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetOmaps" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetOptions" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetScopeW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

 "SymGetSearchPathW" : [ "int" ,  [ "void*" , "void*" , "ulong" ] , ffi.FFI_STDCALL ] ,

// "SymGetSourceFileFromTokenW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSourceFileTokenW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSourceFileW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSourceVarFromTokenW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSymFromAddr" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

 "SymGetSymFromAddr64" : [ "int" ,  [ "void*" , "ulonglong" , "void*" , "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSymFromName" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

 "SymGetSymFromName64" : [ "int" ,  [ "void*" , "void*" , "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSymNext" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSymNext64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSymPrev" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetSymPrev64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

  "SymGetSymbolFileW" : [ "int" , 
         [ 
             "void*" ,
            "void*" , 
            "void*" , 
            "ulong" , 
            "void*" , 
            "size_t" , 
            "void*" ,
            "size_t"
        ] , 

         ffi.FFI_STDCALL 
    ] ,

// "SymGetTypeFromNameW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetTypeInfo" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetTypeInfoEx" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymGetUnwindInfo" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

  "SymInitializeW" : [ "int" ,  [ "void*" , "void*" , "int" ] , ffi.FFI_STDCALL ] ,

// "SymLoadModule" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

 "SymLoadModule64" : [ "ulonglong" ,  [ "void*" , "void*"  , "void*" , "void*"  , "ulonglong" , "ulong"  ] , ffi.FFI_STDCALL ] ,

// "SymLoadModuleExW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymMatchFileNameW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymMatchStringA" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymMatchStringW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymNextW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymPrevW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymRefreshModuleList" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymRegisterCallback" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymRegisterCallback64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymRegisterCallbackW64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymRegisterFunctionEntryCallback" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymRegisterFunctionEntryCallback64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSearchW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSetContext" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSetHomeDirectoryW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

  "SymSetOptions" : [ "ulong" ,  [ "ulong" ] , ffi.FFI_STDCALL ] ,

// "SymSetParentWindow" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSetScopeFromAddr" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSetScopeFromIndex" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

 "SymSetSearchPathW" : [ "int" ,  [ "void*" , "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvDeltaNameW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvGetFileIndexInfoW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvGetFileIndexStringW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvGetFileIndexesW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvGetSupplementW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvIsStoreW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvStoreFileW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymSrvStoreSupplementW" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymUnDName" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymUnDName64" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "SymUnloadModule" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

  "SymUnloadModule64" : [ "int" ,  [ "ulonglong" ] , ffi.FFI_STDCALL ] ,

 "UnDecorateSymbolNameW" : [ "ulong" ,  [ "void*" , "void*" , "ulong" , "ulong" ] , ffi.FFI_STDCALL ] ,

// "UnmapDebugInformation" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

// "WinDbgExtensionDllInit" : [ "int" ,  [ "void*" ] , ffi.FFI_STDCALL ] ,

    "_dummy" : null 
};

var api_name = null;
var api_declare = null;
var api_address = null;

for ( api_name in declare_table )
{
    if ( '_dummy' != api_name )
    {
        api_declare = declare_table[ api_name ];

        try
        {
            api_address = lib_dbghelp.get( api_name );
        }
        catch(err)
        {
            api_address = null;
        }
    }
    else
    {
        api_address = null;
    }

    if ( api_address )
    {
        var argv_ffi = declare_table[ api_name ];

        argv_ffi.unshift( api_address );

        exports[ api_name ] = ffi.ForeignFunction.apply( this , argv_ffi );
    }
}

//----------------------------------------------------------------------

var IMAGEHLP_SYMBOL64 = struct(
    {
        SizeOfStruct : "ulong" ,    
        Address : "ulonglong" ,
        Size : "ulong" , 
        Flags : "ulong" ,
        MaxNameLength : "ulong" ,
        // Name
    }
);
exports.IMAGEHLP_SYMBOL64 = IMAGEHLP_SYMBOL64;
exports.SIZEOF_IMAGEHLP_SYMBOL64 = sizeof( IMAGEHLP_SYMBOL64 );